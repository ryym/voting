class Rewirer {
  constructor(module, mocks) {
    this.targets = [];
  }

  use(module, mocks) {
    this.targets.push({ module, mocks });
    return this;
  }

  run(action) {
    if (0 < action.length) {
      this._runWithMocksAsync(action);
    }
    else {
      this._runWithMocks(action);
    }
  }

  _runWithMocks(action) {
    this.injectMocks();
    action();
    this.resetDependencies();
  }

  _runWithMocksAsync(action) {
    this.injectMocks();
    action(() => {
      this.resetDependencies();
    });
  }

  injectMocks() {
    this.eachMocks((target, name, mock) => {
      target.__Rewire__(name, mock);
    });
  }

  resetDependencies() {
    this.eachMocks((target, name) => {
      target.__ResetDependency__(name);
    });
  }

  eachMocks(callback) {
    this.targets.forEach(target => {
      Object.keys(target.mocks).forEach((name) => {
        const mock = target.mocks[name];
        callback(target.module, name, mock);
      });
    });
  }
}

export default function rewire(module, mocks) {
  if (2 <= arguments.length) {
    return new Rewirer().use(module, mocks);
  }
  return new Rewirer();
}
