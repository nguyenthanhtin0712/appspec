import styled from '@emotion/styled';

export const Container = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export class Circle {
  constructor(ctx, position, radius, color) {
    this.ctx = ctx;
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.opacity = 0;
  }

  static startAngle = 0;
  static endAngle = 2 * Math.PI;
  static anticlockwise = false;

  draw() {
    if (!this.opacity) {
      return;
    }

    const { startAngle, endAngle, anticlockwise } = this.constructor;

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, startAngle, endAngle, anticlockwise);
    this.ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    this.ctx.fill();
  }
}
