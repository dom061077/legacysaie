<%--
  Created by IntelliJ IDEA.
  User: danielmedina
  Date: 14/01/14
  Time: 13:59
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
  <title></title>
</head>
<body>
<div id="page1" data-role="page">
    <div data-role="header" data-theme='b'>
        <h1>My Website</h1>
    </div>
    <div data-role="content" data-theme='c'>
        <p>This is Page 1.</p>
        <a href="#page2" data-role="button">Go to Page 2</a>
    </div>
    <div data-role="footer" data-theme='b'>
        <h1>Footer</h1>
    </div>
</div>

<div id="page2" data-role="page">
    <div data-role="header" data-theme='b'>
        <h1>My Website</h1>
    </div>
    <div data-role="content" data-theme='c'>
        <p>This is Page 2.</p>
        <a href="#page1" data-role="button">Go to Page 1</a>
    </div>
    <div data-role="footer" data-theme='b'>
        <h1>Footer</h1>
    </div>
</div>
</body>
</html>