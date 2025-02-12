export default class PointModel {
  constructor(mockPoints) {
    this.mockPoint = mockPoints;
  }

  get(){
    return this.mockPoint;
  }
}
