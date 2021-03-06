//加载条目和分页
$(()=> {
  function loadProductByPage(pno) {
    var $ul=$(".optul");
    var countrys=[],titles=[],qualifys=[],years=[],edu_levels=[];
    var $as=$ul.find("span:contains(所在国家)+p>a.on");
    $as.each((i,elem)=>{
      countrys.push(elem.innerHTML);
    });
    var $as=$ul.find("span:contains(医生职务)+p>a:not(:first-child).on");
    $as.each((i,elem)=>{
      titles.push(elem.innerHTML);
    });
    var $as=$ul.find("span:contains(医生资质)+p>a:not(:first-child).on");
    $as.each((i,elem)=>{
      qualifys.push(elem.innerHTML);
    });
    var $as=$ul.find("span:contains(从医年限)+p>a:not(:first-child).on");
    $as.each((i,elem)=>{
      years.push(elem.innerHTML);
    });
    var $as=$ul.find("span:contains(最高学历)+p>a:not(:first-child).on");
    $as.each((i,elem)=>{
      edu_levels.push(elem.innerHTML);
    });
    var search="pno="+pno;
    if(countrys.length!=0){
      for(var i=0;i<countrys.length;i++){
        search+="&country[]="+countrys[i];
      }
    }
    if(titles.length!=0){
      for(var i=0;i<titles.length;i++){
        search+="&title[]="+titles[i];
      }
    }
    if(qualifys.length!=0){
      for(var i=0;i<qualifys.length;i++){
        search+="&qualify[]="+qualifys[i];
      }
    }
    if(years.length!=0){
      for(var i=0;i<years.length;i++){
        search+="&years[]="+years[i];
      }
    }
    if(edu_levels.length!=0){
      for(var i=0;i<edu_levels.length;i++){
        search+="&edu_level[]="+edu_levels[i];
      }
    }
    $.get("data/doctor/queryDoctor.php",search).then(output => {
      let data = output.data;
      let fhtml = "";
      for (let d of data) {
        fhtml += `<li class="docDel">
          <div class="doc-pic-name">
              <img src="${d.pic}" alt="">
          </div>
          <div class="rightText">
              <a href="#" class="doc-name">${d.doctor_name}</a>
              <p class="fp"><span>所在机构: ${d.hospital}</span></p>  
              <p><span>当前职务: ${d.title}</span></p>
              <p ><span>擅长项目: <a href="#" class="skills">${d.skills}</a></span></p>
              <p>${d.qualify} | ${d.years} | ${d.country} | ${d.edu_level}</p>
          </div>
          <div></div>
        </li>`;
      }
      $("ul.btmul").html(fhtml);
      let html = "";
      html+="<li><a href=\"#\">上一页</a></li>";
      for(var i=1;i<=output.pageCount;i++){
        if(i==output.pno)
          html+=`<li class="active"><a href="#">${i}</a></li>`;
        else
          html+=`<li><a href="#">${i}</a></li>`;
      }
      html+="<li><a href=\"#\">下一页</a></li>";
          $("#pagination").html(html);
    })
  }
  $("#pagination").on("click","li",function(e){
    e.preventDefault();
    var $li=$(this);
    if($li.is(":contains(上一页),:contains(下一页)")) {
      var i=$("#pagination>li.active").index();
      if ($li.is(":contains(上一页)"))
        i--;
      else
        i++;
    }else{
      $li.addClass("active").siblings().removeClass("active");
      var i=$("#pagination>li.active").index();
    }
    loadProductByPage(i);
  })
      //7:拼接计算
  loadProductByPage(1);
  $(".optul").click(function(e){
    if($(e.target).is("a")){
      var $a=$(e.target);
      if($a.parent().prev().is(":contains(所在国家)")){
        $a.toggleClass("on");
        if(!$a.parent().is(":has(.on)")) $a.parent().children().first().addClass("on");
      }else{
        if($a.is(":first-child")) $a.addClass("on").siblings().removeClass("on");
        else{
          $a.toggleClass("on");
          if($a.parent().is(":has(:not(:first-child).on)"))
            $a.siblings(":first-child").removeClass("on");
          else
            $a.siblings(":first-child").addClass("on");
        }
      }
    }

    loadProductByPage(1);
    e.preventDefault();
  })
});