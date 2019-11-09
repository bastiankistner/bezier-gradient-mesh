const tangentClass = 'tangent-point';
const tangentDistance = 100;

class SingleTangent {
  constructor({ x = 0, y = 0, direction = true }, cp) {
    this.cp = cp;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.boundTangent = null;
    this.initializeDom();
  }

  toScreenSpace(value) {
    return value * tangentDistance * (this.direction ? -1 : 1);
  }

  initializeDom() {
    this.element = document.createElement('div');
    this.element.classList.add(tangentClass);
    this.element.setAttribute(
      'style',
      `transform: translate(${this.toScreenSpace(this.x)}px, ${this.toScreenSpace(this.y)}px)`
    );
    this.element.addEventListener('mousedown', () => this.onTangentMouseDown(this));
    this.cp.cpElement.appendChild(this.element);
  }

  setTangent(x, y) {
    this.x = x;
    this.y = y;
    if (this.element) {
      this.element.setAttribute(
        'style',
        `transform: translate(${this.toScreenSpace(this.x)}px, ${this.toScreenSpace(this.y)}px)`
      );
    }
  }

  moveTangent(x, y) {
    const newX = x / tangentDistance * (this.direction ? -1 : 1);
    const newY = y / tangentDistance * (this.direction ? -1 : 1);
    this.setTangent(newX, newY);
    if (this.boundTangent) {
      this.boundTangent.setTangent(newX, newY);
    }
  }

  onTangentMouseDown(tangent) {
    this.cp.onTangentMouseDown(tangent);
  }

  bindTangent(tangent) {
    this.tangentPair = tangent;
    this.boundTangent = tangent;
    tangent.tangentPair = this;
    tangent.boundTangent = this;
  }

  toggleBindTangents() {
    if (this.tangentPair) {
      if (this.boundTangent) {
        this.boundTangent.boundTangent = null;
        this.boundTangent = null;
      } else {
        this.boundTangent = this.tangentPair;
        this.tangentPair.boundTangent = this;
      }
    } else {
      console.warn('no tangentPair set for tangent');
    }
  }
}
