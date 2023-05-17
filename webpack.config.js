const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//Информационный файл- откуда взять, куда положить, как назвать
module.exports = {
  entry: "./src/index.js", //Указан путь и конечный файл откуда берутся данные
  output: {
    filename: "main.js", //Указан путь и конечный файл куда кладутся, обработаные вебпаком, даанные (название файла)
    path: path.resolve(__dirname, "dist"), //Указан путь и конечный файл куда кладутся, обработаные вебпаком, даанные (название папки)
  },
  plugins: [
    new HtmlWebpackPlugin({
    title: "My App",
    template: "./src/index.html"
  }),
  new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
          'postcss-loader'
        ],
      },
      {
        test: /\.(png|jpg|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
};