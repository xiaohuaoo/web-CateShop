# AirFish电商网站

## 项目简介

* AirFish是一款美食类的电商网站，主要的功能包含：

​		**登陆注册、商品浏览、购物车、预约、用户个人设置**

* 开发时长：1个月11天

## 项目图示

### 首页

![AirFish.jpeg](https://s2.loli.net/2022/05/04/DeXtBUKcal7GjYu.jpg)

### 注册登陆

------

![登陆注册.jpeg](https://s2.loli.net/2022/05/04/Jm5QGOybpEz7ljT.jpg)

### 关于我们列表

***



![网页捕获_4-5-2022_155321_localhost.jpeg](https://s2.loli.net/2022/05/04/UtRZ7piTqX9rzhw.jpg)



### 菜单列表

***



![网页捕获_4-5-2022_155426_localhost.jpeg](https://s2.loli.net/2022/05/04/GYxqpUeEhAKot5f.jpg)

### 图库列表

***



![网页捕获_4-5-2022_155447_localhost.jpeg](https://s2.loli.net/2022/05/04/4lbxML2SHQc7KEn.jpg)

### 厨师列表

***



![网页捕获_4-5-2022_15555_localhost.jpeg](https://s2.loli.net/2022/05/04/vu51UqrsGDmoZYy.jpg)

### 预约

***



![微信截图_20220504155637.png](https://s2.loli.net/2022/05/04/Gc8i31Z7MJDXKIO.png)

### 购物车

***



![网页捕获_4-5-2022_155350_localhost.jpeg](https://s2.loli.net/2022/05/04/HL85AnrfagZYwDJ.jpg)

![网页捕获_4-5-2022_15543_localhost.jpeg](https://s2.loli.net/2022/05/04/zPnBKIptQCrm23o.jpg)

### 个人中心

***



![网页捕获_4-5-2022_15576_localhost.jpeg](https://s2.loli.net/2022/05/04/YaBWKO2oDGkEqJZ.jpg)

### 记录

***



![网页捕获_4-5-2022_155653_localhost.jpeg](https://s2.loli.net/2022/05/04/ALxoydOirtea1wV.jpg)

## 技术栈

* 前端

  Vue2+ElementUI组件库

* 后端

  Node.js+Express框架

* 数据库

  MongoDB
  
 ## 运行

  ### 服务器端

  **项目后端服务器是基于node、mongodb开发，运行前请确认系统已安装相关应用**

  - `npm install` 安装依赖

  - 将`web-serve/db/cate-shop`文件夹下的数据导入到`MongoDB`数据库中。

    数据库导出命令:`mongodump -h 127.0.0.1 -d cateshop-o E:\Program\E-Music\web-serve\db`,

    数据库导入命令:`mongorestore -d cate-shop E:\Program\E-Music\web-serve\db\cate-shop`

  - 修改`web-server/src/config.js`文件，根据注释按需修改。注册使用了邮箱验证，需要手动开启自己邮箱的POP3/SMTP/IMAP服务，具体过程这里不再赘述。

  - `node main.js` 运行服务

  ### 客户端

  - `npm install` 安装依赖

  - `npm run serve` 运行服务

  ### 测试账号

* 名称：xiaohuaoo

* 密码：123

  ### 帮助

  **如遇到无法解决的问题可以私信我或者通过邮箱[A1962400598@163.com]联系我**
