import { parseLines, readInput } from '../../utils';

interface Point2D {
  x: number;
  y: number;
}

interface Line2D {
  start: Point2D;
  end: Point2D;
}

interface Rectangle {
  sideA: Line2D;
  sideB: Line2D;
  sideC: Line2D;
  sideD: Line2D;
  area: number;
}

function compute1(): string {
  const input = readInput(2025, 9);
  const lines = parseLines(input);
  const points = lines
    .map(line => line.split(',').map(Number))
    .map(([x, y]) => ({ x, y }) as Point2D);

  let maxArea = 0;
  for (let i = 0; i < points.length; i++) {
    const pointA = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const pointB = points[j];
      const area = Math.abs(pointA.x - pointB.x + 1) * Math.abs(pointA.y - pointB.y + 1);
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea.toString();
}

function compute2(): string {
  const input = readInput(2025, 9);
  const lines = parseLines(input);
  const points = lines
    .map(line => line.split(',').map(Number))
    .map(([x, y]) => ({ x, y }) as Point2D);

  const polygon: Line2D[] = [];
  for (let i = 0; i < points.length; i++) {
    const start = points[i];
    const end = points[(i + 1) % points.length];
    polygon.push({ start, end });
  }

  const rects: Rectangle[] = [];
  for (let i = 0; i < points.length; i++) {
    const pointA = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const pointB = points[j];
      const area = Math.abs(pointA.x - pointB.x + 1) * Math.abs(pointA.y - pointB.y + 1);
      rects.push({
        sideA: { start: { x: pointA.x, y: pointA.y }, end: { x: pointB.x, y: pointA.y } },
        sideB: { start: { x: pointB.x, y: pointA.y }, end: { x: pointB.x, y: pointB.y } },
        sideC: { start: { x: pointB.x, y: pointB.y }, end: { x: pointA.x, y: pointB.y } },
        sideD: { start: { x: pointA.x, y: pointB.y }, end: { x: pointA.x, y: pointA.y } },
        area,
      });
    }
  }

  rects.sort((a, b) => b.area - a.area);

  for (const rect of rects) {
    if (isInside(polygon, rect)) {
      return rect.area.toString();
    }
  }

  return '';
}

function isInside(polygon: Line2D[], rect: Rectangle): boolean {
  // Helper function to check if a point is inside the polygon using ray casting
  const isPointInside = (point: Point2D, polygon: Line2D[]): boolean => {
    let inside = false;
    const x = point.x;
    const y = point.y;

    for (const edge of polygon) {
      const x1 = edge.start.x;
      const y1 = edge.start.y;
      const x2 = edge.end.x;
      const y2 = edge.end.y;

      // Check if point is on the edge (allowing it to be on the boundary)
      if (isPointOnSegment(point, edge)) {
        return true;
      }

      // Ray casting: count intersections with edges
      if (y1 > y !== y2 > y) {
        const intersectX = ((x2 - x1) * (y - y1)) / (y2 - y1) + x1;
        if (x < intersectX) {
          inside = !inside;
        }
      }
    }

    return inside;
  };

  // Helper function to check if a point is on a line segment
  const isPointOnSegment = (point: Point2D, segment: Line2D): boolean => {
    const { start, end } = segment;
    const crossProduct =
      (point.y - start.y) * (end.x - start.x) - (point.x - start.x) * (end.y - start.y);

    // Not on the line if cross product is not zero
    if (Math.abs(crossProduct) > 1e-10) return false;

    // Check if point is within the segment bounds
    return (
      point.x >= Math.min(start.x, end.x) &&
      point.x <= Math.max(start.x, end.x) &&
      point.y >= Math.min(start.y, end.y) &&
      point.y <= Math.max(start.y, end.y)
    );
  };

  // Get all four corners of the rectangle
  const corners = [
    rect.sideA.start, // top-left
    rect.sideB.start, // top-right
    rect.sideC.start, // bottom-right
    rect.sideD.start, // bottom-left
  ];

  // All corners must be inside or on the polygon
  if (!corners.every(corner => isPointInside(corner, polygon))) {
    return false;
  }

  // Also check that no rectangle edge crosses the polygon boundaries
  const rectSides = [rect.sideA, rect.sideB, rect.sideC, rect.sideD];
  for (const rectSide of rectSides) {
    for (const polyEdge of polygon) {
      if (intersect(rectSide, polyEdge)) {
        return false;
      }
    }
  }

  return true;
}

function intersect(line1: Line2D, line2: Line2D): boolean {
  const { start: p1, end: p2 } = line1;
  const { start: p3, end: p4 } = line2;

  // Calculate the direction of the cross product
  const ccw = (a: Point2D, b: Point2D, c: Point2D): number => {
    return (c.y - a.y) * (b.x - a.x) - (b.y - a.y) * (c.x - a.x);
  };

  const d1 = ccw(p3, p4, p1);
  const d2 = ccw(p3, p4, p2);
  const d3 = ccw(p1, p2, p3);
  const d4 = ccw(p1, p2, p4);

  // Only return true for proper intersections (strict crossing)
  // Segments must have endpoints on opposite sides of each other
  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
    return true;
  }

  return false;
}

export default { compute1, compute2 };
