import{_ as n,c as a,o as p,a2 as e}from"./chunks/framework.BYJ_yxop.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"note/NodeJs/案例/02-socket.io多人聊天室.md","filePath":"note/NodeJs/案例/02-socket.io多人聊天室.md","lastUpdated":null}'),l={name:"note/NodeJs/案例/02-socket.io多人聊天室.md"};function i(r,s,c,b,t,o){return p(),a("div",null,[...s[0]||(s[0]=[e(`<p>传统的 HTTP 是一种单向请求-响应协议，客户端发送请求后，服务器才会响应并返回相应的数据。在传统的 HTTP 中，客户端需要主动发送请求才能获取服务器上的资源，而且每次请求都需要重新建立连接，这种方式在实时通信和持续获取资源的场景下效率较低。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a23a9bbcd029464794a93f4470c6d077~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1103&amp;h=280&amp;s=55630&amp;e=png&amp;b=ffffff" alt="image.png"></p><p>Socket 提供了实时的双向通信能力，可以实时地传输数据。客户端和服务器之间的通信是即时的，数据的传输和响应几乎是实时完成的，不需要轮询或定时发送请求</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7530e974bdf4a5e81aee0300559ac6f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1127&amp;h=272&amp;s=56502&amp;e=png&amp;b=fefefe" alt="image.png"></p><h3 id="安装依赖" tabindex="-1">安装依赖 <a class="header-anchor" href="#安装依赖" aria-label="Permalink to &quot;安装依赖&quot;">​</a></h3><p>在正常开发中，我们会使用成熟的第三方库，原生<code>websocket</code>，用的较少，一些简单的项目，或者一些普通的业务可以使用，不过大部分还是使用第三方库。</p><p>socket.io</p><p>Socket.IO 是一个基于事件驱动的实时通信框架，用于构建实时应用程序。它提供了双向、低延迟的通信能力，使得服务器和客户端可以实时地发送和接收数据。</p><p>Socket.IO 的主要特点包括：</p><ol><li><strong>实时性</strong>: Socket.IO 构建在 WebSocket 协议之上，使用了 WebSocket 连接来实现实时通信。WebSocket 是一种双向通信协议，相比传统的 HTTP 请求-响应模型，它可以实现更快速、低延迟的数据传输。</li><li><strong>事件驱动</strong>: Socket.IO 使用事件驱动的编程模型。服务器和客户端可以通过触发事件来发送和接收数据。这种基于事件的通信模式使得开发者可以轻松地构建实时的应用程序，例如聊天应用、实时协作工具等。</li><li><strong>跨平台支持</strong>: Socket.IO 可以在多个平台上使用，包括浏览器、服务器和移动设备等。它提供了对多种编程语言和框架的支持，如 JavaScript、Node.js、Python、Java 等，使得开发者可以在不同的环境中构建实时应用程序。</li><li><strong>容错性</strong>: Socket.IO 具有容错能力，当 WebSocket 连接不可用时，它可以自动降级到其他传输机制，如 HTTP 长轮询。这意味着即使在不支持 WebSocket 的环境中，Socket.IO 仍然可以实现实时通信。</li><li><strong>扩展性</strong>: Socket.IO 支持水平扩展，可以将应用程序扩展到多个服务器，并实现事件的广播和传递。这使得应用程序可以处理大规模的并发连接，并实现高可用性和高性能</li></ol><p>nodejs 安装</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> </span></span>
<span class="line"><span>npm install socket.io</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>浏览器使用esm</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> </span></span>
<span class="line"><span>&lt;script type=&quot;module&quot;&gt;</span></span>
<span class="line"><span>import { io } from &quot;https://cdn.socket.io/4.7.4/socket.io.esm.min.js&quot;;</span></span>
<span class="line"><span> const socket = io(&#39;ws://localhost:3000&#39;); //ws的地址</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><a href="https://link.juejin.cn?target=https%3A%2F%2Fsocket.io%2Fzh-CN%2F" target="_blank" rel="noreferrer">socket.io官网</a></p><h3 id="聊天室" tabindex="-1">聊天室 <a class="header-anchor" href="#聊天室" aria-label="Permalink to &quot;聊天室&quot;">​</a></h3><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/183535edf8454c9596fee379e26ee8fc~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1905&amp;h=955&amp;s=149815&amp;e=png&amp;b=202020" alt="image.png"></p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4f452a50dbd4669817f4a911af405a6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1907&amp;h=976&amp;s=121051&amp;e=png&amp;b=252525" alt="image.png"></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> </span></span>
<span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span>    &lt;style&gt;</span></span>
<span class="line"><span>        * {</span></span>
<span class="line"><span>            padding: 0;</span></span>
<span class="line"><span>            margin: 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        html,</span></span>
<span class="line"><span>        body,</span></span>
<span class="line"><span>        .room {</span></span>
<span class="line"><span>            height: 100%;</span></span>
<span class="line"><span>            width: 100%;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .room {</span></span>
<span class="line"><span>            display: flex;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .left {</span></span>
<span class="line"><span>            width: 300px;</span></span>
<span class="line"><span>            border-right: 0.5px solid #f5f5f5;</span></span>
<span class="line"><span>            background: #333;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .right {</span></span>
<span class="line"><span>            background: #1c1c1c;</span></span>
<span class="line"><span>            flex: 1;</span></span>
<span class="line"><span>            display: flex;</span></span>
<span class="line"><span>            flex-direction: column;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .header {</span></span>
<span class="line"><span>            background: #8d0eb0;</span></span>
<span class="line"><span>            color: white;</span></span>
<span class="line"><span>            padding: 10px;</span></span>
<span class="line"><span>            box-sizing: border-box;</span></span>
<span class="line"><span>            font-size: 20px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .main {</span></span>
<span class="line"><span>            flex: 1;</span></span>
<span class="line"><span>            padding: 10px;</span></span>
<span class="line"><span>            box-sizing: border-box;</span></span>
<span class="line"><span>            font-size: 20px;</span></span>
<span class="line"><span>            overflow: auto;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .main-chat {</span></span>
<span class="line"><span>            color: green;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .footer {</span></span>
<span class="line"><span>            min-height: 200px;</span></span>
<span class="line"><span>            border-top: 1px solid green;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .footer .ipt {</span></span>
<span class="line"><span>            width: 100%;</span></span>
<span class="line"><span>            height: 100%;</span></span>
<span class="line"><span>            color: green;</span></span>
<span class="line"><span>            outline: none;</span></span>
<span class="line"><span>            font-size: 20px;</span></span>
<span class="line"><span>            padding: 10px;</span></span>
<span class="line"><span>            box-sizing: border-box;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .groupList {</span></span>
<span class="line"><span>            height: 100%;</span></span>
<span class="line"><span>            overflow: auto;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .groupList-items {</span></span>
<span class="line"><span>            height: 50px;</span></span>
<span class="line"><span>            width: 100%;</span></span>
<span class="line"><span>            background: #131313;</span></span>
<span class="line"><span>            display: flex;</span></span>
<span class="line"><span>            align-items: center;</span></span>
<span class="line"><span>            justify-content: center;</span></span>
<span class="line"><span>            color: white;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    &lt;/style&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;div class=&quot;room&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;left&quot;&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;groupList&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;right&quot;&gt;</span></span>
<span class="line"><span>        &lt;header class=&quot;header&quot;&gt;聊天室&lt;/header&gt;</span></span>
<span class="line"><span>        &lt;main class=&quot;main&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;/main&gt;</span></span>
<span class="line"><span>        &lt;footer class=&quot;footer&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;ipt&quot; contenteditable&gt;&lt;/div&gt;</span></span>
<span class="line"><span>        &lt;/footer&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>    &lt;script type=&quot;module&quot;&gt;</span></span>
<span class="line"><span>        const sendMessage = (message) =&gt; {</span></span>
<span class="line"><span>            const div = document.createElement(&#39;div&#39;);</span></span>
<span class="line"><span>            div.className = &#39;main-chat&#39;;</span></span>
<span class="line"><span>            div.innerText = \`\${message.user}:\${message.text}\`;</span></span>
<span class="line"><span>            main.appendChild(div)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        const groupEl = document.querySelector(&#39;.groupList&#39;);</span></span>
<span class="line"><span>        const main = document.querySelector(&#39;.main&#39;);</span></span>
<span class="line"><span>        import { io } from &quot;https://cdn.socket.io/4.7.4/socket.io.esm.min.js&quot;;</span></span>
<span class="line"><span>        const name = prompt(&#39;请输入你的名字&#39;);</span></span>
<span class="line"><span>        const room = prompt(&#39;请输入房间号&#39;);</span></span>
<span class="line"><span>        const socket = io(&#39;ws://localhost:3000&#39;);</span></span>
<span class="line"><span>        //键盘按下发送消息</span></span>
<span class="line"><span>        document.addEventListener(&#39;keydown&#39;, (e) =&gt; {</span></span>
<span class="line"><span>            if (e.key === &#39;Enter&#39;) {</span></span>
<span class="line"><span>                e.preventDefault();</span></span>
<span class="line"><span>                const ipt = document.querySelector(&#39;.ipt&#39;);</span></span>
<span class="line"><span>                socket.emit(&#39;message&#39;, {</span></span>
<span class="line"><span>                    text: ipt.innerText,</span></span>
<span class="line"><span>                    room: room,</span></span>
<span class="line"><span>                    user: name</span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span>                sendMessage({</span></span>
<span class="line"><span>                    text: ipt.innerText,</span></span>
<span class="line"><span>                    user: name,</span></span>
<span class="line"><span>                })</span></span>
<span class="line"><span>                ipt.innerText = &#39;&#39;;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>        //连接成功socket</span></span>
<span class="line"><span>        socket.on(&#39;connect&#39;, () =&gt; {</span></span>
<span class="line"><span>            socket.emit(&#39;join&#39;, { name, room });//加入一个房间</span></span>
<span class="line"><span>            socket.on(&#39;message&#39;, (message) =&gt; {</span></span>
<span class="line"><span>                sendMessage(message)</span></span>
<span class="line"><span>            })</span></span>
<span class="line"><span>            socket.on(&#39;groupList&#39;, (groupList) =&gt; {</span></span>
<span class="line"><span>                console.log(groupList);</span></span>
<span class="line"><span>                groupEl.innerHTML = &#39;&#39;</span></span>
<span class="line"><span>                Object.keys(groupList).forEach(key =&gt; {</span></span>
<span class="line"><span>                    const item = document.createElement(&#39;div&#39;);</span></span>
<span class="line"><span>                    item.className = &#39;groupList-items&#39;;</span></span>
<span class="line"><span>                    item.innerText = \`房间名称:\${key} 房间人数:\${groupList[key].length}\`</span></span>
<span class="line"><span>                    groupEl.appendChild(item)</span></span>
<span class="line"><span>                })</span></span>
<span class="line"><span>            })</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br></div></div><h4 id="nodejs" tabindex="-1">nodejs <a class="header-anchor" href="#nodejs" aria-label="Permalink to &quot;nodejs&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> </span></span>
<span class="line"><span>import http from &#39;http&#39;</span></span>
<span class="line"><span>import { Server } from &#39;socket.io&#39;</span></span>
<span class="line"><span>import express from &#39;express&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const app = express()</span></span>
<span class="line"><span>app.use(&#39;*&#39;, (req, res, next) =&gt; {</span></span>
<span class="line"><span>    res.setHeader(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);</span></span>
<span class="line"><span>    res.setHeader(&quot;Access-Control-Allow-Headers&quot;, &quot;*&quot;);</span></span>
<span class="line"><span>    res.setHeader(&quot;Access-Control-Allow-Methods&quot;, &quot;*&quot;);</span></span>
<span class="line"><span>    next()</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>const server = http.createServer(app)</span></span>
<span class="line"><span>const io = new Server(server, {</span></span>
<span class="line"><span>    cors: true //允许跨域</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>const groupList = {}</span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * [{1008:[{name,room,id}]}]</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>io.on(&#39;connection&#39;, (socket) =&gt; {</span></span>
<span class="line"><span>    //加入房间</span></span>
<span class="line"><span>    socket.on(&#39;join&#39;, ({ name, room }) =&gt; {</span></span>
<span class="line"><span>        socket.join(room)</span></span>
<span class="line"><span>        if (groupList[room]) {</span></span>
<span class="line"><span>            groupList[room].push({ name, room, id: socket.id })</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            groupList[room] = [{ name, room, id: socket.id }]</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        socket.emit(&#39;message&#39;, { user: &#39;管理员&#39;, text: \`\${name}进入了房间\` })</span></span>
<span class="line"><span>        socket.emit(&#39;groupList&#39;, groupList)</span></span>
<span class="line"><span>        socket.broadcast.emit(&#39;groupList&#39;, groupList)</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    //发送消息</span></span>
<span class="line"><span>    socket.on(&#39;message&#39;, ({ text, room, user }) =&gt; {</span></span>
<span class="line"><span>        socket.broadcast.to(room).emit(&#39;message&#39;, {</span></span>
<span class="line"><span>            text,</span></span>
<span class="line"><span>            user</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    //断开链接内置事件</span></span>
<span class="line"><span>    socket.on(&#39;disconnect&#39;, () =&gt; {</span></span>
<span class="line"><span>        Object.keys(groupList).forEach(key =&gt; {</span></span>
<span class="line"><span>            let leval = groupList[key].find(item =&gt; item.id === socket.id)</span></span>
<span class="line"><span>            if (leval) {</span></span>
<span class="line"><span>                socket.broadcast.to(leval.room).emit(&#39;message&#39;, { user: &#39;管理员&#39;, text: \`\${leval.name}离开了房间\` })</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            groupList[key] = groupList[key].filter(item =&gt; item.id !== socket.id)</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>        socket.broadcast.emit(&#39;groupList&#39;, groupList)</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server.listen(3000, () =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;listening on *:3000&#39;);</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div>`,21)])])}const d=n(l,[["render",i]]);export{u as __pageData,d as default};
