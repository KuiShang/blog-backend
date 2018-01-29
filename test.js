
class A {
  constructor() {
  }
  print() {
    console.log(123);
  }
}
  class B extends A {
    constructor() {
      super();
    }
    m() {
      console.log(this)
      this.print();
    }
  }
  
  let b = new B();
  b.m() // 2