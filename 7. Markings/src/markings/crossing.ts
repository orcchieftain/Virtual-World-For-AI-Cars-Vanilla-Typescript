import { MathPoint } from "../types/mathTypes";
import { PointClass, SegmentClass } from "../types/primitiveTypes";
import { translate, angle, add, scale, perpendicular } from "../math/utils";
import Segment from "../primitives/segment";
import Envelope from "../primitives/envelope";
import Polygon from "../primitives/polygon";

class Crossing {
  support: Segment;
  poly: Polygon;
  borders: [SegmentClass, SegmentClass];

  constructor(public center: PointClass | MathPoint, public directionVector: PointClass, public width: number, public height: number) {
    this.center = center;
    this.directionVector = directionVector;
    this.width = width;
    this.height = height;
    this.support = new Segment(
      translate(center, angle(directionVector), height / 2),
      translate(center, angle(directionVector), -height / 2)
    );

    this.poly = new Envelope(this.support, width, 0).poly;

    this.borders = [this.poly.segments[0], this.poly.segments[2]];
  }

  draw(ctx: CanvasRenderingContext2D) {
    // this.poly.draw(ctx);
    const perp = perpendicular(this.directionVector);
    const line = new Segment(add(this.center, scale(perp, this.width / 2)), add(this.center, scale(perp, -this.width / 2)));
    line.draw(ctx, { lineWidth: this.height, color: "white", dash: [11, 11] });

    // drawing borders perpendicular to the zebra
    // for (const b of this.borders) {
    //   b.draw(ctx, { lineWidth: 1, color: "green" });
    // }
  }
}

export default Crossing;
