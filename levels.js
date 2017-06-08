function level1(app) {
    this.shape = new PIXI.Graphics();
    this.shape.beginFill(0x784800);
    this.shape.drawEllipse(0, 0, 250, 250);
    this.shape.endFill();
    this.shape.x = app.renderer.width / 2; // - this.shape.width / 2;
    this.shape.y = app.renderer.height / 2; // - this.shape.height / 2;
    app.stage.addChild(this.shape);

    this.shape2 = new PIXI.Graphics();
    this.shape2.beginFill(0xFFFFFF);
    this.shape2.drawEllipse(0, 0, 150, 150);
    this.shape2.endFill();
    this.shape2.x = app.renderer.width / 2;
    this.shape2.y = app.renderer.height / 2;
    app.stage.addChild(this.shape2);

    this.startX = this.shape.x - this.shape.width / 2 + 100;
    this.startY = this.shape.y - this.shape.height / 2 + 100;
    this.centerX = this.shape.x;
    this.centerY = this.shape.y;
    this.radius = this.shape.width / 2;

    this.contains = function (w, x, y) {
        var a = x - this.centerX;
        var b = y - this.centerY;

        var c = Math.sqrt(a * a + b * b);
        if (c < this.radius - w / 2 && c > this.radius - this.shape2.width / 2 + w * 2)
            return true;
        else
            return false;
    }
}
