import { memo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import _ from 'lodash';

import { Circle, Container } from './Spiders.styles';

const Spiders = () => {
  const canvas = useRef(null);
  const points = useRef([]);
  const position = useRef({
    x: 0,
    y: 0
  });

  useEffect(() => {
    if ('ontouchstart' in window) {
      // Ignore mobile
      return;
    }
    _updateSize();
    _createPoints();
    _animate();
    window.addEventListener('mousemove', _onMouseMove);
    window.addEventListener('resize', _onResize);
    return () => {
      window.removeEventListener('mousemove', _onMouseMove);
      window.removeEventListener('resize', _onResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const _onResize = () => {
    _createPoints();
    _updateSize();
  };

  const _updateSize = () => {
    if (canvas.current) {
      // get the size the canvas (from the DOM, not the "in canvas" size)
      const { width, height } = canvas.current.getBoundingClientRect();
      canvas.current.width = width;
      canvas.current.height = height;
      position.current = {
        x: width / 2,
        y: height / 3
      };
    }
  };

  const _createPoints = () => {
    points.current = [];
    const { width, height } = canvas.current;

    const noiseFactor = _.min([width / 50, 20]);
    for (let x = 0; x < width; x += width / noiseFactor) {
      for (let y = 0; y < height; y += height / noiseFactor) {
        const px = x + (Math.random() * width) / noiseFactor;
        const py = y + (Math.random() * height) / noiseFactor;
        points.current.push({
          x: px,
          originX: px,
          y: py,
          originY: py
        });
      }
    }

    // for each point find the 5 closest points
    for (let i = 0; i < points.current.length; i++) {
      const closest = [];
      const p1 = points.current[i];

      for (let j = 0; j < points.current.length; j++) {
        const p2 = points.current[j];

        if (!(p1 === p2)) {
          let placed = false;

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (_.isUndefined(closest[k])) {
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

    // assign a circle to each point
    const ctx = canvas.current.getContext('2d');
    for (const i in points.current) {
      const point = points.current[i];
      point.circle = new Circle(ctx, points.current[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
      _shiftPoint(point);
    }
  };

  const _shiftPoint = (point) => {
    const duration = 1 + Math.random() * 2;
    const x = point.originX - 50 + Math.random() * 100;
    const y = point.originY - 50 + Math.random() * 100;
    const onComplete = () => _shiftPoint(point);
    gsap.timeline().to(point, { x, y, onComplete }).duration(duration);
  };

  const _animate = () => {
    if (canvas.current) {
      const { width, height } = canvas.current;
      const ctx = canvas.current.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      for (const i in points.current) {
        // detect points in range
        const distanceFromCursor = Math.abs(getDistance(position.current, points.current[i]));
        if (distanceFromCursor < 4000) {
          points.current[i].opacity = 0.3;
          points.current[i].circle.opacity = 0.6;
        } else if (distanceFromCursor < 20000) {
          points.current[i].opacity = 0.1;
          points.current[i].circle.opacity = 0.3;
        } else if (distanceFromCursor < 40000) {
          points.current[i].opacity = 0.02;
          points.current[i].circle.opacity = 0.1;
        } else {
          points.current[i].opacity = 0;
          points.current[i].circle.opacity = 0;
        }
        _drawLines(points.current[i]);
        points.current[i].circle.draw();
      }

      requestAnimationFrame(() => _animate());
    }
  };

  const _drawLines = (point) => {
    if (!point.opacity) {
      return;
    }
    const ctx = canvas.current.getContext('2d');
    for (const i in point.closest) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.closest[i].x, point.closest[i].y);
      ctx.strokeStyle = `rgba(255,255,255,${point.opacity})`;
      ctx.stroke();
    }
  };

  const _onMouseMove = (e) => {
    let posx,
      posy = 0;
    if (!_.isUndefined(e.pageX) && !_.isUndefined(e.pageY)) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (!_.isUndefined(e.clientX) && !_.isUndefined(e.clientY)) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    position.current = {
      x: posx,
      y: posy
    };
  };

  return <Container ref={canvas} />;
};

// Util
function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

export default memo(Spiders);
