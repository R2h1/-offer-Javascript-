const code = {
  language: 'css',
  content: `
      * {
      margin: 0;
      padding: 0;
    }

    li {
      list-style: none;
    }

    html,
    body {
      height: 100%;
    }

    .container {
      height: 100%;
      display: flex;
    }

    .left {
      width: 200px;
      padding-left: 15px;
      display: flex;
      flex-direction: column;
      color: #ffffff;
      background-color: rgb(64, 67, 73);
    }

    .right {
      flex: 1;
      background-color: rgb(35, 35, 35);
    }

    .left .title {
      margin-top: 15px;
      color: #bbb;
    }

    .left button {
      width: 150px;
      padding: 8px 20px;
      margin-top: 30px;
      color: #ffffff;
      border-radius: 3px;
      border: 1px solid rgb(45, 117, 218);
      background-color: rgb(8, 95, 218);
    }

    .left button:hover {
      border-color: rgb(10, 85, 147);
    }

    .left button:active {
      background-color: rgb(43, 83, 157);
    }

    .left .file-tree-wrapper {
      margin-top: 30px;
      margin-right: 8px;
    }

    .file-tree-wrapper .root:first-child {
      margin-left: 0;
    }

    .left .root {
      margin-left: 15px;
    }

    .left .item {
      font-size: 14px;
      padding: 5px 2px 5px 2px;
    }

    .left .item a {
      display: inline-block;
      padding: 5px 0;
    }

    .left .item.file {
      padding-left: 20px;
    }

    .hide {
      display: none;
    }

    .close-dir {
      height: 34px;
      overflow: hidden;
    }          
  `,
};
