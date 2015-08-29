# input-filter
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/codelegant/inputer-filter/blob/master/LICENSE)
[![Browers Support](https://img.shields.io/badge/Browers-IE7+,Chrome,FireFox,Opera-blue.svg?style=flat-square)](https://github.com/codelegant/inputer-filter)
[![jQuery Dependencies](https://img.shields.io/badge/jQuery-v1.4.1-blue.svg?style=flat-square)](https://github.com/codelegant/inputer-filter)

一款用于过滤输入的jQuery插件，使用对象必须是**输入框**，HTML标签为**input**，type类型可为 *text*，*email*，*password*，*url*，*date*等可输入值的类型。
##浏览器支持
IE7及以上，Chrome，Firefox，Opera
##参数列表
```js
$.fn.inputFilter.options = {
    "type": "alnum",
    "length": null,
    "min": 0,
    "max": Infinity,
    "uppercase": true,
    "lowercase": true,
    "transform": null,
    "valueChange": function(element, value) {}
}
```
##参数说明
#### 1、type
你想得到过滤结果的类型，参数类型：`String`，默认值：`alnum`。<br>
三个可选值：`digit`，`alpha` 与 `alnum`；<br>
`digit`：只允许输入 **正整数** ，将字母与符号屏蔽；<br> 
`alpha`：只允许输入 **字母**，将数字与符号屏蔽；<br> 
`alnum`：只允许输入 **正整数与字母**，将符号屏蔽。

#### 2、length
限制字符输入长度，参数类型：`Number`，默认值：`null`，`type`的值为`alpha`或者`alnum`时生效。

#### 3、min
数值的最小值，参数类型：`Number`，默认值：`0`，`type`的值为`digit`时生效。

#### 4、max
数值的最大值，参数类型：`Number`，默认值：`Infinity`，`type`的值为`digit`时生效。

#### 5、uppercase
是否允许输入大写字母，参数类型：`Boolean`，默认值：`true`，`type`的值为`alpha`与`alnum`时生效。

#### 6、lowercase
是否允许输入小写字母，参数类型：`Boolean`，默认值：`true`，`type`的值为`alpha`与`alnum`时生效。

#### 7、transform
将字符进行大小写转换，参数类型：`String`，两个可选值：`uppercase`与`lowercase`;<br>
`uppercase`，将所有字母转换为小写；`lowercase`，将所有字母转换为大写。

#### 8、valueChange
值改变事件，输入框中的值改变时触发，**IE8中则是敲击键盘时触发**，类型：`Function`，有两个参数，`element`与`value`。<br>
`element`：当前输入框，即使用插件的对象。<br/>
`value`：当前输入框的值。
