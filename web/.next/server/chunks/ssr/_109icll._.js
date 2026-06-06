module.exports=[16426,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"warnOnce",{enumerable:!0,get:function(){return d}});let d=a=>{}},29945,(a,b,c)=>{"use strict";let d;Object.defineProperty(c,"__esModule",{value:!0});var e={getAssetToken:function(){return i},getAssetTokenQuery:function(){return j},getDeploymentId:function(){return g},getDeploymentIdQuery:function(){return h}};for(var f in e)Object.defineProperty(c,f,{enumerable:!0,get:e[f]});function g(){return d}function h(a=!1){return d?`${a?"&":"?"}dpl=${d}`:""}function i(){return!1}function j(a=!1){return""}d=void 0},1359,(a,b,c)=>{"use strict";function d({widthInt:a,heightInt:b,blurWidth:c,blurHeight:e,blurDataURL:f,objectFit:g}){let h=c?40*c:a,i=e?40*e:b,j=h&&i?`viewBox='0 0 ${h} ${i}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${j}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${j?"none":"contain"===g?"xMidYMid":"cover"===g?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${f}'/%3E%3C/svg%3E`}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getImageBlurSvg",{enumerable:!0,get:function(){return d}})},53549,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={VALID_LOADERS:function(){return f},imageConfigDefault:function(){return g}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=["default","imgix","cloudinary","akamai","custom"],g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},87713,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getImgProps",{enumerable:!0,get:function(){return j}}),a.r(16426);let d=a.r(29945),e=a.r(1359),f=a.r(53549),g=["-moz-initial","fill","none","scale-down",void 0];function h(a){return void 0!==a.default}function i(a){return void 0===a?a:"number"==typeof a?Number.isFinite(a)?a:NaN:"string"==typeof a&&/^[0-9]+$/.test(a)?parseInt(a,10):NaN}function j({src:a,sizes:b,unoptimized:c=!1,priority:k=!1,preload:l=!1,loading:m,className:n,quality:o,width:p,height:q,fill:r=!1,style:s,overrideSrc:t,onLoad:u,onLoadingComplete:v,placeholder:w="empty",blurDataURL:x,fetchPriority:y,decoding:z="async",layout:A,objectFit:B,objectPosition:C,lazyBoundary:D,lazyRoot:E,...F},G){var H;let I,J,K,{imgConf:L,showAltText:M,blurComplete:N,defaultLoader:O}=G,P=L||f.imageConfigDefault;if("allSizes"in P)I=P;else{let a=[...P.deviceSizes,...P.imageSizes].sort((a,b)=>a-b),b=P.deviceSizes.sort((a,b)=>a-b),c=P.qualities?.sort((a,b)=>a-b);I={...P,allSizes:a,deviceSizes:b,qualities:c}}if(void 0===O)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let Q=F.loader||O;delete F.loader,delete F.srcSet;let R="__next_img_default"in Q;if(R){if("custom"===I.loader)throw Object.defineProperty(Error(`Image with src "${a}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let a=Q;Q=b=>{let{config:c,...d}=b;return a(d)}}if(A){"fill"===A&&(r=!0);let a={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[A];a&&(s={...s,...a});let c={responsive:"100vw",fill:"100vw"}[A];c&&!b&&(b=c)}let S="",T=i(p),U=i(q);if((H=a)&&"object"==typeof H&&(h(H)||void 0!==H.src)){let b=h(a)?a.default:a;if(!b.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(b)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!b.height||!b.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(b)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(J=b.blurWidth,K=b.blurHeight,x=x||b.blurDataURL,S=b.src,!r)if(T||U){if(T&&!U){let a=T/b.width;U=Math.round(b.height*a)}else if(!T&&U){let a=U/b.height;T=Math.round(b.width*a)}}else T=b.width,U=b.height}let V=!k&&!l&&("lazy"===m||void 0===m);(!(a="string"==typeof a?a:S)||a.startsWith("data:")||a.startsWith("blob:"))&&(c=!0,V=!1),I.unoptimized&&(c=!0),R&&!I.dangerouslyAllowSVG&&a.split("?",1)[0].endsWith(".svg")&&(c=!0);let W=i(o),X=Object.assign(r?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:B,objectPosition:C}:{},M?{}:{color:"transparent"},s),Y=N||"empty"===w?null:"blur"===w?`url("data:image/svg+xml;charset=utf-8,${(0,e.getImageBlurSvg)({widthInt:T,heightInt:U,blurWidth:J,blurHeight:K,blurDataURL:x||"",objectFit:X.objectFit})}")`:`url("${w}")`,Z=g.includes(X.objectFit)?"fill"===X.objectFit?"100% 100%":"cover":X.objectFit,$=Y?{backgroundSize:Z,backgroundPosition:X.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:Y}:{},_=function({config:a,src:b,unoptimized:c,width:e,quality:f,sizes:g,loader:h}){if(c){if(b.startsWith("/")&&!b.startsWith("//")){let a=(0,d.getDeploymentId)();if(a){let c=b.indexOf("?");if(-1!==c){let d=new URLSearchParams(b.slice(c+1));d.get("dpl")||(d.append("dpl",a),b=b.slice(0,c)+"?"+d.toString())}else b+=`?dpl=${a}`}}return{src:b,srcSet:void 0,sizes:void 0}}let{widths:i,kind:j}=function({deviceSizes:a,allSizes:b},c,d){if(d){let c=/(^|\s)(1?\d?\d)vw/g,e=[];for(let a;a=c.exec(d);)e.push(parseInt(a[2]));if(e.length){let c=.01*Math.min(...e);return{widths:b.filter(b=>b>=a[0]*c),kind:"w"}}return{widths:b,kind:"w"}}return"number"!=typeof c?{widths:a,kind:"w"}:{widths:[...new Set([c,2*c].map(a=>b.find(b=>b>=a)||b[b.length-1]))],kind:"x"}}(a,e,g),k=i.length-1;return{sizes:g||"w"!==j?g:"100vw",srcSet:i.map((c,d)=>`${h({config:a,src:b,quality:f,width:c})} ${"w"===j?c:d+1}${j}`).join(", "),src:h({config:a,src:b,quality:f,width:i[k]})}}({config:I,src:a,unoptimized:c,width:T,quality:W,sizes:b,loader:Q}),aa=V?"lazy":m;return{props:{...F,loading:aa,fetchPriority:y,width:T,height:U,decoding:z,className:n,style:{...X,...$},sizes:_.sizes,srcSet:_.srcSet,src:t||_.src},meta:{unoptimized:c,preload:l||k,placeholder:w,fill:r}}}},42377,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/image-component.js <module evaluation>"))},43489,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/image-component.js"))},18409,a=>{"use strict";a.i(42377);var b=a.i(43489);a.n(b)},53200,(a,b,c)=>{"use strict";function d(a,b){let c=a||75;return b?.qualities?.length?b.qualities.reduce((a,b)=>Math.abs(b-c)<Math.abs(a-c)?b:a,b.qualities[0]):c}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"findClosestQuality",{enumerable:!0,get:function(){return d}})},37763,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"default",{enumerable:!0,get:function(){return g}});let d=a.r(53200),e=a.r(29945);function f({config:a,src:b,width:c,quality:g}){let h=(0,e.getDeploymentId)();if(b.startsWith("/")&&!b.startsWith("//")){let a=b.indexOf("?");if(-1!==a){let c=new URLSearchParams(b.slice(a+1)),d=c.get("dpl");if(d){h=d,c.delete("dpl");let e=c.toString();b=b.slice(0,a)+(e?"?"+e:"")}}}if(b.startsWith("/")&&b.includes("?")&&a.localPatterns?.length===1&&"**"===a.localPatterns[0].pathname&&""===a.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${b}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let i=(0,d.findClosestQuality)(g,a);return`${a.path}?url=${encodeURIComponent(b)}&w=${c}&q=${i}${b.startsWith("/")&&h?`&dpl=${h}`:""}`}f.__next_img_default=!0;let g=f},50858,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return k},getImageProps:function(){return j}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(71029),g=a.r(87713),h=a.r(18409),i=f._(a.r(37763));function j(a){let{props:b}=(0,g.getImgProps)(a,{defaultLoader:i.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[25,50,75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[a,c]of Object.entries(b))void 0===c&&delete b[a];return{props:b}}let k=h.Image},3236,(a,b,c)=>{b.exports=a.r(50858)},71548,a=>{"use strict";var b=a.i(7997),c=a.i(3236);function d({contributor:a}){var e,f;let g=!a.login||!a.avatar_url,h=g?"Anonymous Contributor":a.login,i=g?"https://avatars.githubusercontent.com/u/0?v=4":a.avatar_url,j=(e=a.contributions)>=100?"Maintainer":e>=50?"Core Contributor":e>=10?"Contributor":"Community Member",k=(f=a.contributions)>=100?"program-badge maintainer-badge":f>=50?"program-badge core-badge":f>=10?"program-badge contributor-badge":"program-badge community-badge";return(0,b.jsxs)("article",{className:"feature-card contributor-card","aria-label":`Contributor: ${h}`,children:[(0,b.jsx)("div",{className:"contributor-avatar-wrapper",children:(0,b.jsx)(c.default,{src:i,alt:g?"Anonymous contributor avatar":`${h}'s avatar`,width:80,height:80,className:"contributor-avatar"})}),(0,b.jsxs)("div",{className:"contributor-info",children:[(0,b.jsx)("h3",{className:"contributor-name",children:a.html_url&&!g?(0,b.jsx)("a",{href:a.html_url,target:"_blank",rel:"noopener noreferrer",className:"contributor-link","aria-label":`View ${h}'s GitHub profile`,children:h}):h}),(0,b.jsx)("p",{className:"contributor-commits",children:(0,b.jsxs)("span",{"aria-label":`${a.contributions} commits`,children:[a.contributions.toLocaleString()," commit",1!==a.contributions?"s":""]})}),(0,b.jsx)("span",{className:k,role:"status",children:j})]})]})}async function e(){try{let a=await fetch("https://api.github.com/repos/SB2318/UltimateHealth/contributors?per_page=100&anon=1",{next:{revalidate:86400},headers:{Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"}});if(!a.ok)return console.error(`GitHub API responded with status ${a.status}`),[];let b=await a.json();return Array.isArray(b)?b:[]}catch(a){return console.error("Failed to fetch contributors:",a),[]}}let f=[{name:"GSSoC 2026",description:"GirlScript Summer of Code 2026 — Empowering open-source contributors with mentorship and real-world project experience.",badge:"Active"},{name:"GSSoC 2024",description:"GirlScript Summer of Code 2024 — Our successful participation season that welcomed dozens of new contributors.",badge:"Completed"},{name:"IEEE IGDTUW Open Source Week",description:"IEEE IGDTUW Open Source Week — Collaborating with IEEE to promote open-source culture among engineering students.",badge:"Completed"},{name:"Vultr Hackathon",description:"Vultr Cloud Hackathon — Leveraging cloud infrastructure to build scalable health-tech solutions.",badge:"Completed"}];async function g(){let a=await e(),c=a.filter(a=>"github-actions[bot]"!==a.login&&"dependabot[bot]"!==a.login),g=c.length,h=c.reduce((a,b)=>a+b.contributions,0);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        .contributor-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          padding: 1.5rem 1rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .contributor-card:hover {
          transform: translateY(-4px);
        }
        .contributor-avatar-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--primary, #3b82f6);
          flex-shrink: 0;
        }
        .contributor-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        .contributor-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          width: 100%;
        }
        .contributor-name {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0;
          word-break: break-word;
        }
        .contributor-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .contributor-link:hover {
          color: var(--primary, #3b82f6);
          text-decoration: underline;
        }
        .contributor-commits {
          font-size: 0.82rem;
          margin: 0;
          opacity: 0.7;
        }
        .maintainer-badge { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; }
        .core-badge { background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; }
        .contributor-badge { background: linear-gradient(135deg, #10b981, #059669); color: #fff; }
        .community-badge { background: linear-gradient(135deg, #64748b, #475569); color: #fff; }

        .stats-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.85rem;
          opacity: 0.75;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .programs-section {
          padding: 4rem 0;
        }
        .programs-section h2 {
          text-align: center;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .programs-section p {
          text-align: center;
          opacity: 0.7;
          margin-bottom: 2.5rem;
        }
        .program-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .program-card h3 {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0;
        }
        .program-card p {
          font-size: 0.88rem;
          opacity: 0.75;
          margin: 0;
          line-height: 1.5;
          text-align: left;
        }

        .cta-section {
          padding: 3.5rem 0;
        }
        .cta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .cta-card {
          border-radius: 12px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
        }
        .cta-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
        }
        .cta-card p {
          font-size: 0.875rem;
          opacity: 0.7;
          line-height: 1.55;
          margin: 0;
        }
        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary, #3b82f6);
          text-decoration: none;
          transition: gap 0.15s ease;
        }
        .cta-link:hover {
          gap: 0.6rem;
          text-decoration: underline;
        }
        .section-title {
          text-align: center;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .section-subtitle {
          text-align: center;
          opacity: 0.7;
          margin-bottom: 2.5rem;
        }
        .empty-state {
          text-align: center;
          padding: 4rem 1rem;
          opacity: 0.6;
        }
        @media (max-width: 640px) {
          .stat-number { font-size: 1.8rem; }
          .stats-row { gap: 1.25rem; }
        }
      `}),(0,b.jsxs)("main",{children:[(0,b.jsx)("section",{className:"hero","aria-labelledby":"contributors-heading",children:(0,b.jsxs)("div",{className:"container",children:[(0,b.jsx)("h1",{id:"contributors-heading",children:"Our Contributors"}),(0,b.jsx)("p",{children:"UltimateHealth is built by a passionate community of open-source contributors. Every commit, every issue, every pull request makes health knowledge more accessible to the world."}),(0,b.jsxs)("div",{className:"stats-row",role:"region","aria-label":"Contribution statistics",children:[(0,b.jsxs)("div",{className:"stat-item",children:[(0,b.jsx)("span",{className:"stat-number","aria-label":`${g} total contributors`,children:g.toLocaleString()}),(0,b.jsx)("span",{className:"stat-label",children:"Contributors"})]}),(0,b.jsxs)("div",{className:"stat-item",children:[(0,b.jsx)("span",{className:"stat-number","aria-label":`${h} total commits`,children:h.toLocaleString()}),(0,b.jsx)("span",{className:"stat-label",children:"Commits"})]}),(0,b.jsxs)("div",{className:"stat-item",children:[(0,b.jsx)("span",{className:"stat-number","aria-label":"4 programs",children:4}),(0,b.jsx)("span",{className:"stat-label",children:"Programs"})]})]})]})}),(0,b.jsxs)("section",{className:"container","aria-labelledby":"contributors-grid-heading",style:{paddingTop:"3rem",paddingBottom:"3rem"},children:[(0,b.jsx)("h2",{id:"contributors-grid-heading",className:"section-title",children:"Meet the Team"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Sorted by contributions — thank you to every single one of you!"}),a.length>0?(0,b.jsx)("div",{role:"list","aria-label":"Contributors list",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"24px"},children:c.map((a,c)=>(0,b.jsx)("div",{role:"listitem",children:(0,b.jsx)(d,{contributor:a})},a.login??`anon-${c}`))}):(0,b.jsx)("div",{className:"empty-state",role:"status","aria-live":"polite",children:(0,b.jsx)("p",{children:"Unable to load contributors at this time. Please check back later."})})]}),(0,b.jsxs)("section",{className:"programs-section container","aria-labelledby":"programs-heading",children:[(0,b.jsx)("h2",{id:"programs-heading",children:"Open Source Programs"}),(0,b.jsx)("p",{children:"We proudly participate in these open-source initiatives"}),(0,b.jsx)("div",{className:"feature-grid",role:"list","aria-label":"Open source programs",children:f.map(a=>(0,b.jsxs)("article",{className:"program-card",role:"listitem",children:[(0,b.jsxs)("div",{className:"program-card-header",children:[(0,b.jsx)("h3",{children:a.name}),(0,b.jsx)("span",{className:`program-badge ${"Active"===a.badge?"core-badge":"community-badge"}`,"aria-label":`Status: ${a.badge}`,children:a.badge})]}),(0,b.jsx)("p",{children:a.description})]},a.name))})]}),(0,b.jsxs)("section",{className:"cta-section container","aria-labelledby":"get-involved-heading",children:[(0,b.jsx)("h2",{id:"get-involved-heading",className:"section-title",children:"Get Involved"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Whether you're a seasoned developer or just starting out, there's a place for you here."}),(0,b.jsxs)("div",{className:"cta-grid",children:[(0,b.jsxs)("div",{className:"cta-card",role:"region","aria-labelledby":"guidelines-heading",children:[(0,b.jsx)("h3",{id:"guidelines-heading",children:"How to Contribute Further?"}),(0,b.jsxs)("p",{children:["New to open source or looking to contribute? Our guidelines walk you through everything from setting up your environment to submitting your first pull request. We have plenty of beginner-friendly issues labeled"," ",(0,b.jsx)("strong",{children:"good first issue"})," waiting for you!"]}),(0,b.jsx)("a",{href:"https://github.com/SB2318/UltimateHealth/blob/main/CONTRIBUTING.md",target:"_blank",rel:"noopener noreferrer",className:"cta-link","aria-label":"Read the contribution guidelines on GitHub (opens in new tab)",children:"See Guidelines Page →"}),(0,b.jsx)("a",{href:"https://github.com/SB2318/UltimateHealth/issues?q=is%3Aopen+label%3A%22good+first+issue%22",target:"_blank",rel:"noopener noreferrer",className:"cta-link","aria-label":"Browse beginner-friendly issues on GitHub (opens in new tab)",children:"Browse Beginner-Friendly Issues →"})]}),(0,b.jsxs)("div",{className:"cta-card",role:"region","aria-labelledby":"community-heading",children:[(0,b.jsx)("h3",{id:"community-heading",children:"Want to Start a Discussion? ❤️"}),(0,b.jsx)("p",{children:"Have a question, feature idea, or want to report a bug? Open an issue on GitHub. We appreciate every contribution — big or small — and our maintainers actively review and respond to community input."}),(0,b.jsx)("a",{href:"https://github.com/SB2318/UltimateHealth/issues/new/choose",target:"_blank",rel:"noopener noreferrer",className:"cta-link","aria-label":"Create a new issue on GitHub (opens in new tab)",children:"Create Issue on GitHub →"}),(0,b.jsx)("p",{style:{marginTop:"0.25rem",fontSize:"0.82rem"},children:"Appreciate your contribution ❤️"})]})]})]})]})]})}a.s(["default",0,g])},87738,a=>{a.n(a.i(71548))}];

//# sourceMappingURL=_109icll._.js.map