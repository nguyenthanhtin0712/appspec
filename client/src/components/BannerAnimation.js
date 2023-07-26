import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeaderAnimation = ({ width, height }) => {
  const canvasRef = useRef(null);
  const target = useRef({ x: width / 2, y: height / 2 });
  const points = useRef([]);
  let animateHeader = true;

  useEffect(() => {
    initHeader();
    initAnimation();
    addListeners();

    return () => {
      removeListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initHeader = () => {
    target.current = { x: width / 2, y: height / 2 };

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    points.current = [];
    for (let x = 0; x < width; x = x + width / 20) {
      for (let y = 0; y < height; y = y + height / 20) {
        const px = x + Math.random() * (width / 20);
        const py = y + Math.random() * (height / 20);
        const p = { x: px, originX: px, y: py, originY: py };
        points.current.push(p);
      }
    }

    for (let i = 0; i < points.current.length; i++) {
      const closest = [];
      const p1 = points.current[i];
      for (let j = 0; j < points.current.length; j++) {
        const p2 = points.current[j];
        if (!(p1 === p2)) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    for (let i in points.current) {
      const c = new Circle(points.current[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
      points.current[i].circle = c;
    }
  };

  const addListeners = () => {
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  };

  const removeListeners = () => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('scroll', scrollCheck);
    window.removeEventListener('resize', resize);
  };

  const mouseMove = (e) => {
    const posx = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    const posy = e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    target.current.x = posx;
    target.current.y = posy;
  };

  const scrollCheck = () => {
    if (document.body.scrollTop > height) {
      animateHeader = false;
    } else {
      animateHeader = true;
    }
  };

  const resize = () => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
  };

  const initAnimation = () => {
    animate();
    for (let i in points.current) {
      shiftPoint(points.current[i]);
    }
  };

  const animate = () => {
    if (animateHeader) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);

      for (let i in points.current) {
        const p = points.current[i];
        if (Math.abs(getDistance(target.current, p)) < 4000) {
          p.active = 0.3;
          p.circle.active = 0.6;
        } else if (Math.abs(getDistance(target.current, p)) < 20000) {
          p.active = 0.1;
          p.circle.active = 0.3;
        } else if (Math.abs(getDistance(target.current, p)) < 40000) {
          p.active = 0.02;
          p.circle.active = 0.1;
        } else {
          p.active = 0;
          p.circle.active = 0;
        }

        drawLines(ctx, p);
        p.circle.draw(ctx);
      }
    }
    requestAnimationFrame(animate);
  };

  const shiftPoint = (p) => {
    gsap.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: 'power2.inOut',
      onComplete: () => {
        shiftPoint(p);
      }
    });
  };

  const drawLines = (ctx, p) => {
    if (!p.active) return;
    for (let i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
      ctx.stroke();
    }
  };

  const Circle = function (pos, rad, color) {
    this.pos = pos || null;
    this.radius = rad || null;
    this.color = color || null;

    this.draw = function (ctx) {
      if (!this.active) return;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')';
      ctx.fill();
    };
  };

  const getDistance = (p1, p2) => {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  };

  return <canvas id="demo-canvas" ref={canvasRef} />;
};

export default HeaderAnimation;
