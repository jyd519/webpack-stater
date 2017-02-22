var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config")();

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  // lazy: true,
  index: "index.html",
  publicPath: "/" // Same as `output.publicPath` in most cases.
}));
app.use(require("webpack-hot-middleware")(compiler));

app.listen(5000, function () {
  console.log("Listening on port 5000!");
});
