(this["webpackJsonpweb-app"]=this["webpackJsonpweb-app"]||[]).push([[0],{117:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(15),o=a.n(i),c=(a(90),a(17)),l=a(18),s=a(20),u=a(19),d=a(56),m=(a(92),a(122)),p=a(50),h=a(77),v=a(124),y=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={aboutShown:!1,area:"AUS"},e.showAbout=function(t){e.setState({aboutShown:!e.state.aboutShown})},e.selectArea=function(t){e.setState({area:t}),e.props.selectArea(t)},e}return Object(l.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("header",null,r.a.createElement("h1",{className:"text1"},"Activities in ",this.state.area),r.a.createElement("h2",{className:"text2"},"#AustraliaLockdown"),r.a.createElement(m.a,{className:"area-selector",variant:"outline-warning",onSelect:function(t){e.selectArea(t)},id:"dropdown-basic-button",title:"Select Area"},r.a.createElement(p.a.Item,{eventKey:"aus"},"Australia"),r.a.createElement(p.a.Item,{eventKey:"nsw"},"New South Wales")),r.a.createElement(h.a,{variant:"outline-warning",className:"text3",onClick:this.showAbout},"About this map")),r.a.createElement(v.a,{show:this.state.aboutShown,onHide:this.showAbout},r.a.createElement(v.a.Header,{closeButton:!0},r.a.createElement(v.a.Title,null,"Activities during #AustraliaLockdown")),r.a.createElement(v.a.Body,null,r.a.createElement("p",null,"This map shows popular activities in Australian metropolitan areas as well as New South Wales during #LockdownAustralia based on Twitter data."),r.a.createElement("p",null,"This application is developed for Cluster and Cloud Computing assigment 2 Semester 1 2020 by"),r.a.createElement("ul",null,r.a.createElement("li",null,"klastanto@student.unimelb.edu.au"),r.a.createElement("li",null,"mchaerudin@student.unimelb.edu.au"),r.a.createElement("li",null,"sanisuzzaman@student.unimelb.edu.au"),r.a.createElement("li",null,"devinvinun@student.unimelb.edu.au"),r.a.createElement("li",null,"abhisheka@student.unimelb.edu.au")),"Credits:",r.a.createElement("ul",null,r.a.createElement("li",null,"Map provider: OpenStreetMap by OpenStreetMap contributors"),r.a.createElement("li",null,"Data provider: Twitter, AURIN"),r.a.createElement("li",null,"Icons provider: Fontawesome (CC BY 4.0 License)"))),r.a.createElement(v.a.Footer,null,r.a.createElement(h.a,{variant:"secondary",onClick:this.showAbout},"Close"))))}}]),a}(n.Component),b=a(58),f=a(64),E=a(52),g=a(65),w=a(63),A=a(62),S=a(61),x=a(66),O=a(33),k=a.n(O),C=a(39),j=a(47),N=a(57),_=a(49),D=a(123),L=a(26),I=a.n(L),M=a(80),F=a(81),U=a(40),T=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).selectLayer=function(t){e.props.selectLayer(t)},e}return Object(l.a)(a,[{key:"render",value:function(){var e=this,t=this.props.layer,a=t.text,n=t.variant,i=t.className,o=t.contents;return r.a.createElement("div",null,r.a.createElement(m.a,{className:i,variant:n,id:"dropdown-basic-button",title:a},o.map((function(t){return r.a.createElement(p.a.Item,{key:t.id,eventKey:t.id,onSelect:function(){return e.selectLayer(t)}},t.text)}))))}}]),a}(n.Component),V=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props.activity,t=e.id,a=e.text,n=e.icon,i=e.variant,o=e.className;return r.a.createElement("div",null,r.a.createElement(h.a,{variant:i,onClick:this.props.selectActivity.bind(this,t),type:"button",className:o},a,r.a.createElement(j.a,{icon:n,size:"2x"})))}}]),a}(n.Component),z=a(22),B=a(5),W=a(4),J=a.n(W),P=a(1),R=a.n(P),q=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"createLeafletElement",value:function(e){}},{key:"componentDidMount",value:function(){var e=this,t=J.a.control({position:this.props.position});t.onAdd=function(){for(var t=J.a.DomUtil.create("div","legend"),a=[],n=0;n<e.props.levels.length;n++){var r=e.props.levels[n],i=e.props.levels[n+1],o="<span style='opacity: 0.85; background:"+e.props.getColor(r+1)+"'>&nbsp; &nbsp; &nbsp;</span> "+parseInt(r).toLocaleString("en-AU")+(i?"&ndash;"+parseInt(i).toLocaleString("en-AU"):"+");a.push(o)}return t.innerHTML=a.join("<br/>"),t},t.addTo(this.props.leaflet.map)}}]),a}(z.a);q.propTypes={colors:R.a.array.isRequired,levels:R.a.array.isRequired,position:R.a.string.isRequired};var H=Object(B.d)(q);C.b.add(N.a,_.c,_.b,_.a);var K=["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b","#05234d"],$=[0,1e4,2e4,3e4,4e4,5e4,6e4,7e4,8e4,9e4],Y=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).activityData={},e.indexData={},e.state={viewport:e.props.vp,selectedActivity:null,loading:{nsw:!0,aus:!0},selectedContentId:0,selectedContent:null,currentArea:"aus"},e.getColor=function(e){var t=K[0];return e>9e4?t=K[9]:e>8e4?t=K[8]:e>7e4?t=K[7]:e>6e4?t=K[6]:e>5e4?t=K[5]:e>4e4?t=K[4]:e>3e4?t=K[3]:e>2e4?t=K[2]:e>1e4&&(t=K[1]),t},e.resetView=function(){e.setState({viewport:e.props.vp})},e.onViewportChanged=function(t){e.setState({viewport:t})},e.setSelectedActivity=function(t){e.setState({selectedActivity:t})},e.selectLayer=function(t){e.setState({selectedContentId:t.id,selectedContent:t})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=[I.a.get(U.webServiceUrl+"/summaries/nsw",{crossDomain:!0}),I.a.get(U.webServiceUrl+"/indices/nsw",{crossDomain:!0})],a=[I.a.get(U.webServiceUrl+"/summaries/aus",{crossDomain:!0}),I.a.get(U.webServiceUrl+"/indices/aus",{crossDomain:!0})];I.a.all(t).then(I.a.spread((function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];e.activityData.nsw=a[0].data,e.indexData.nsw=a[1].data;var r=Object(b.a)({},e.state.loading);r.nsw=!1,e.setState({loading:r})}))).catch((function(e){console.log("Errors: "+e)})),I.a.all(a).then(I.a.spread((function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];e.activityData.aus=a[0].data,e.indexData.aus=a[1].data;var r=Object(b.a)({},e.state.loading);r.aus=!1,e.setState({loading:r}),console.log("AU data loaded."),console.log(e.state.loading)}))).catch((function(e){console.log("Errors: "+e)}))}},{key:"changeViewPort",value:function(e){this.state.currentArea!==e&&(this.setState({currentArea:e}),this.resetView())}},{key:"render",value:function(){var e=this;return setInterval((function(){return e.changeViewPort(e.props.area)}),1e3),r.a.createElement(f.a,{id:"map",onViewportChanged:this.onViewportChanged,viewport:this.state.viewport},r.a.createElement(E.b,{position:"topleft"},r.a.createElement(k.a,{position:"topleft"},r.a.createElement("button",{className:"leaflet-control-layers feat-btn-reset-view",onClick:this.resetView},r.a.createElement(j.a,{icon:N.a,size:"lg"}))),r.a.createElement(E.b.BaseLayer,{checked:"checked",name:"Black and White"},r.a.createElement(g.a,{attribution:"&copy <a href='http://osm.org/copyright'> OpenStreetMap</a> contributors",url:"https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"})),r.a.createElement(E.b.BaseLayer,{name:"Coloured"},r.a.createElement(g.a,{attribution:"&copy <a href='http://osm.org/copyright'> OpenStreetMap</a> contributors",url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}))),r.a.createElement(w.a,null,this.indexData[this.state.currentArea]?r.a.createElement(A.a,{key:this.state.currentArea,data:this.indexData[this.state.currentArea],style:function(t){return{color:"#4a83ec",weight:.5,fillColor:e.getColor(t.properties[e.state.selectedContentId]),fillOpacity:.85}}}):r.a.createElement(r.a.Fragment,null)),r.a.createElement(w.a,null,this.state.selectedActivity&&this.activityData[this.state.currentArea].summary?this.activityData[this.state.currentArea].summary.map((function(t,a){return r.a.createElement(S.a,{color:"#dbae28",key:a,center:[t.point[1],t.point[0]],radius:5*Math.log(t[e.state.selectedActivity+"_total"]),fillOpacity:.3,stroke:!0,weight:2},r.a.createElement(x.a,{direction:"right",offset:[-8,-2],opacity:1},r.a.createElement("strong",null,t.name," : "),r.a.createElement("span",null,parseInt(t[e.state.selectedActivity+"_total"]).toLocaleString("en-AU")," (",+(100*Math.round(t[e.state.selectedActivity]+"e+4")+"e-4"),"%)")))})):r.a.createElement(r.a.Fragment,null)),this.state.selectedContent?r.a.createElement(r.a.Fragment,null,r.a.createElement(H,{position:"bottomleft",getColor:this.getColor,levels:$}),r.a.createElement(k.a,{position:"bottomleft"},r.a.createElement("span",null,r.a.createElement("strong",null,this.state.selectedContent?this.state.selectedContent.text:"")))):r.a.createElement(r.a.Fragment,null),this.state.loading[this.state.currentArea]?r.a.createElement(k.a,{position:"topright"},r.a.createElement("span",null,r.a.createElement("strong",null,"Loading data..."))):r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,{position:"topright"},r.a.createElement(D.a,{toggle:!0},F.map((function(t){return r.a.createElement(T,{layer:t,key:t.id,variant:t.variant,className:t.className,selectLayer:e.selectLayer})}))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement(k.a,{position:"topright"},r.a.createElement(D.a,{vertical:!0},M.map((function(t){return r.a.createElement(V,{activity:t,key:t.id,selectActivity:e.setSelectedActivity})}))))))}}]),a}(n.Component),G={center:[-33.834905,150.9673231],zoom:(d.isMobile,9)},Q={center:[-28.6101111,134.3547222],zoom:d.isMobile?4:5},X=Q,Z=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={viewport:X,selectedActivity:"exercise",area:"aus"},e.resetView=function(){e.setState({viewport:X})},e.onViewportChanged=function(t){e.setState({viewport:t})},e.setSelected=function(t){e.setState({selected:t})},e.selectOverlayLayer=function(t){e.setState({selectedData:t.data})},e.selectArea=function(t){e.setState({area:t}),"aus"===t?e.setState({viewport:Q}):e.setState({viewport:G})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){document.title="Activities during #AustraliaLockdown"}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{selectArea:this.selectArea}),r.a.createElement("div",{id:"container"},r.a.createElement(Y,{vp:this.state.viewport,area:this.state.area})))}}]),a}(n.Component);a(116),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},40:function(e){e.exports=JSON.parse('{"webServiceUrl":"http://115.146.93.155:8080"}')},80:function(e){e.exports=JSON.parse('[{"id":"exercise","text":"Exercise","icon":"running","desc":"Exercise","variant":"warning","className":"activity-btn"},{"id":"food","text":"Food","icon":"hamburger","desc":"Food","variant":"warning","className":"activity-btn"},{"id":"film","text":"Film","icon":"film","desc":"Film","variant":"warning","className":"activity-btn"}]')},81:function(e){e.exports=JSON.parse('[{"id":0,"text":"Occupation","icon":"people-carry","desc":"Occupation","variant":"secondary","className":"layer-btn","contents":[{"id":"occ_clerical_and_admin","text":"Clerical and Admin"},{"id":"occ_professionals","text":"Professionals"},{"id":"occ_labours","text":"Labours"},{"id":"occ_operator_and_drivers","text":"Operator and Drivers"},{"id":"occ_managers","text":"Managers"},{"id":"occ_service_workers","text":"Service Workers"},{"id":"occ_notstated","text":"Not Stated"}]},{"id":1,"text":"Education","icon":"graduation-cap","desc":"Education ratio","variant":"secondary","className":"layer-btn","contents":[{"id":"edu_primary","text":"Primary Education"},{"id":"edu_secondary","text":"Secondary Education"},{"id":"edu_technical education","text":"Technical Education"},{"id":"edu_university_and_tertiary","text":"University and Tertiary Education"},{"id":"edu_other_fulltime","text":"Other Fulltime Education"},{"id":"edu_other","text":"Other Education"}]},{"id":2,"text":"Income","icon":"chart-pie","desc":"Income","variant":"secondary","className":"layer-btn","contents":[{"id":"mean_income","text":"Mean Income ($)"}]}]')},85:function(e,t,a){e.exports=a(117)},90:function(e,t,a){},92:function(e,t,a){}},[[85,1,2]]]);
//# sourceMappingURL=main.47112402.chunk.js.map