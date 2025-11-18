import { convert } from 'html-to-text';
import juice from 'juice';

//#region Helper

//#region BaseEmailTemplate
const baseEmailTemplate = `<div class="protected" style="background-color: #f6f6f6; min-height: 100dvh;">
<div style="height: 2rem;">&nbsp;</div>
<div style="max-width: 600px; margin: auto; border-top: 10px solid rgb(203, 6, 17); font-family: Helvetica,Arial,sans-serif; font-size: 16px; color: #404242; line-height: 24px;">
<div style="background-color: white; padding: 40px;"><header class="protected"><img class="mceNonEditable" style="border-style: none; padding-bottom: 1rem;" src="data:image/png;base64,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" alt="Cloudflare" height="75"></header>
<div id="fullTextContent05ba1342cd-2d97-4021-a02c-866750b9e3cd">
<div>
<h1>Masukan Judul</h1>
<p>Hai,&nbsp;<span class="mceNonEditable protected" style="background-color: #f1c40f;">{{ username }}</span>&nbsp;</p>
<p>Anda telah berhasil terdaftar pada fitur pemberitahuan email pada aplikasi <strong>RETTS WebApp</strong>.<br><br>Setiap pesan pemberitahuan akan terkirim otomatis melalui sistem.&nbsp;Terima kasih telah menggunakan layanan ini.<br><br>Salam hangat,<br><strong>RET Technology Solutions</strong><br><br></p>
<p><span style="font-size: 10pt;"><em>Catatan : Pesan dibuat secara otomatis, mohon untuk tidak membalas pesan ini.</em></span></p>
<p>&nbsp;</p>
</div>
</div>
</div>
<footer class="mceNonEditable protected" style="text-align: center; color: #8f8f8f; font-size: 13px;">
<p style="text-align: center;"><strong>PT. RET Technology Solutions</strong> <br>Jln. Metro duta V, Pondok Duta II, BB3 No.3<br>Bakti Jaya, Kec. Sukmajaya, Kota Depok, Jawa Barat <br><a style="text-decoration: none; color: #8f8f8f;" href="www.ret.co.id">www.ret.co.id</a> | (021) 22820962</p>
<div style="display: flex; gap: 20px; justify-content: center; padding: 20px; max-width: 600px;"><a title="Facebook"> <img style="display: block; margin-right: auto; margin-left: auto; border-style: none;" src="https://inboxflows.com/_/image/https%253A%252F%252Finfo.cloudflare.com%252Frs%252F713-XSC-918%252Fimages%252Fsocial-icon-fb-email-108px.png/?inbox_flows_img_sig=eyJwYXRoIjoiaHR0cHMlM0ElMkYlMkZpbmZvLmNsb3VkZiJ9:1pOOps:yRPpYYtnco6IWp7JfVofPEYaLmNG1t5UPbZdgK1eFhc" alt="Facebook" width="36" height="36"> </a><a title="Twitter"> <img style="display: block; margin-right: auto; margin-left: auto; border-style: none;" src="https://inboxflows.com/_/image/https%253A%252F%252Finfo.cloudflare.com%252Frs%252F713-XSC-918%252Fimages%252Fsocial-icon-twitter-email-108px.png/?inbox_flows_img_sig=eyJwYXRoIjoiaHR0cHMlM0ElMkYlMkZpbmZvLmNsb3VkZiJ9:1pOOps:yRPpYYtnco6IWp7JfVofPEYaLmNG1t5UPbZdgK1eFhc" alt="Twitter" width="36" height="36"> </a><a title="LinkedIn"> <img style="display: block; margin-right: auto; margin-left: auto; border-style: none;" src="https://inboxflows.com/_/image/https%253A%252F%252Finfo.cloudflare.com%252Frs%252F713-XSC-918%252Fimages%252Fsocial-icon-linkedin-email-108px.png/?inbox_flows_img_sig=eyJwYXRoIjoiaHR0cHMlM0ElMkYlMkZpbmZvLmNsb3VkZiJ9:1pOOps:yRPpYYtnco6IWp7JfVofPEYaLmNG1t5UPbZdgK1eFhc" alt="LinkedIn" width="36" height="36"> </a></div>
</footer></div>
</div>`;
//#endregion BaseEmailTemlate

//#region TextEditor
function InlineHTMLStyle(html: string, css: string) {
  return juice.inlineContent(html, css);
}

function HTMLToWhatsApp(html: string) {
  return convert(html, {
    formatters: {
      em: (elem, walk, builder, ) => {
        builder.addInline('_');
        walk(elem.children, builder);
        builder.addInline('_');
      },
      strong: (elem, walk, builder, ) => {
        builder.addInline('*');
        walk(elem.children, builder);
        builder.addInline('*');
      },
      s: (elem, walk, builder, ) => {
        builder.addInline('~');
        walk(elem.children, builder);
        builder.addInline('~');
      },
      code: (elem, walk, builder, ) => {
        builder.addInline('```');
        walk(elem.children, builder);
        builder.addInline('```');
      },
      pre: (elem, walk, builder, ) => {
        builder.addInline('```');
        walk(elem.children, builder);
        builder.addInline('```');
      },
    },
    decodeEntities: true,

    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: 'footer', format: 'skip' },
      { selector: 'header', format: 'skip' },
      {
        selector: 'ul',
        options: {
          prefix: '-',
        },
      },
      {
        selector: 'em',
        format: 'em',
        options: {
          prefix: '_',
          suffix: '_',
        },
      },
      {
        selector: 'strong',
        format: 'strong',
        options: {
          prefix: '*',
          suffix: '*',
        },
      },

      {
        selector: 's',
        format: 's',
        options: {
          prefix: '~',
          suffix: '~',
        },
      },
      {
        selector: 'code',
        format: 'code',
        options: {
          prefix: '```',
          suffix: '```',
        },
      },

      {
        selector: 'pre',
        format: 'pre',
        options: {
          prefix: '```',
          suffix: '```',
        },
      },
      {
        selector: 'a',
        options: {
          linkBrackets: false,
        },
      },
      {
        selector: 'hr',
        options: {
          length: 20,
        },
      },
    ],
  });
}

function extractUrlsAndReplace(htmlString: string): {
  urls: string[];
  updatedHtml: string;
} {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const links = doc.querySelectorAll('a');
  const urls: string[] = [];

  // Iterate through each <a> tag
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href) {
      urls.push(href);

      // Replace the <a> tag with its text content
      const textContent = href || '';
      link.replaceWith(textContent);
    }
  });

  // Serialize the updated HTML back into a string
  const updatedHtml = doc.body.innerHTML;

  return { urls, updatedHtml };
}

function TrimHeaderFooterWithStyle(html: string) {
  return html
    .replace(
      /<header class="protected">[\s\S]*?<\/header>|<footer class="protected">[\s\S]*?<\/footer>/g,
      '',
    )
    .replace(/ style="[^"]*"/g, '');
}
//#endregion TextEditor

export default {
  InlineHTMLStyle,
  HTMLToWhatsApp,
  extractUrlsAndReplace,
  baseEmailTemplate,
  TrimHeaderFooterWithStyle,
};
