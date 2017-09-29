import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Frame from 'react-frame-component';
import './PreviewPane.css';

class PreviewPane extends Component {
  constructor() {
    super();
    this.previewWindow = null;
  }

  render() {
    return (<div className='outer-frame'>
      <Frame
        className='frame'
        initialContent={`
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Your Message Subject or Title</title>
  <style type="text/css">
  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
    line-height: 100%;
  }

  body {
    -webkit-text-size-adjust:none; -ms-text-size-adjust:none;
  }

  body {
    margin: 0;
    padding: 0;
  }

  table td {
    border-collapse: collapse;
  }

  p {
    margin:0;
    margin-bottom:0;
    padding:0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: black;
    line-height: 100%;
  }

  a,
  a:link {
    color:#2A5DB0;
    text-decoration: underline;
  }

  body, #body_style {
    background: #f8f8f8;
    min-height: 1000px;
    color: #000000;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
  }

  span.yshortcuts { color:#000; background-color:none; border:none;}
  span.yshortcuts:hover,
  span.yshortcuts:active,
  span.yshortcuts:focus {color:#000; background-color:none; border:none;}

  img {
    max-width: 100%;
  }

  a:visited { color: #3c96e2; text-decoration: none}
  a:focus   { color: #3c96e2; text-decoration: underline}
  a:hover   { color: #3c96e2; text-decoration: underline}

  @media only screen and (max-width: 630px) {
    table.email-content-table {
      width: 100%;
    }
  }

  @media only screen and (max-device-width: 480px) {
    body[yahoo] #container1 {display:block !important}
    body[yahoo] #body_style {padding: 0 !important}
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px)  {
    body[yahoo] #container1 {display:block !important} /*example style*/
  }
  </style>


</head>
<body style="background:#f8f8f8; min-height:1000px; color:#000000; font-family:Helvetica, Arial, sans-serif; font-size:16px"
alink="#3c96e2" link="#3c96e2" bgcolor="#f8f8f8" text="#000000" yahoo="fix">
  <div id="body_style" style="padding:15px">
    <table cellpadding="15" cellspacing="0" border="0" bgcolor="#ffffff" width="600" align="center" class="email-content-table">
      <tr>
        <td align="center">
          <a href="http://www.google.com" target="_blank"><img src="http://www.therobotfund.org/page/-/email-generator/client-logo-2.jpg" width="300" style="display: block" border="0" alt="Your Logo Here" title="Your Logo Here"></a>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" align="center">
            <tr>
              <td class="email-content" style="color:#000000; font-family:Helvetica, Arial, sans-serif; font-size:16px">
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center">
          <a href="%%UNSUBSCRIBE%%?email=%%EMAIL%%" style="color:#3c96e2" target="_blank">Unsubscribe</a>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`}
        mountTarget='.email-content'>
        {this.props.children}
      </Frame>
      <div className='preview-controls'>
        <button className='btn-update' onClick={this.updateHtml.bind(this)}>Update HTML</button>
        <button className='btn-new-window' onClick={this.openInWindow.bind(this)}>Open in Window</button>
      </div>
    </div>);
  }

  getPaneHtml() {
    const iframe = ReactDOM.findDOMNode(this).firstChild;
    const content = iframe.contentDocument || iframe.contentWindow.document;
    const doctype = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">`;
    return doctype + content.documentElement.outerHTML;
  }

  // TODO(jjandoc): I have no idea why this isn't running.
  contentDidUpdate() {
    const html = this.getPaneHtml();
    this.props.onPreviewUpdate(html);
    if (this.previewWindow) {
      this.previewWindow.document.write(html);
    }
  }

  updateHtml() {
    this.props.onPreviewUpdate(this.getPaneHtml());
  }

  openInWindow() {
    const html = this.getPaneHtml();
    this.previewWindow = window.open('about:blank', '', '_blank');
    this.previewWindow.document.write(html);
  }
}

export default PreviewPane;
