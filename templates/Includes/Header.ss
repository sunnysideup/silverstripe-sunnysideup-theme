<style>
#splash-screen {
    position: fixed;
    inset: 0;
    z-index: 999;
    display: grid;
    place-items: center;
    background: #575757;//#000;// #f7cd55;
    animation: splash-fade 1s ease 1.5s forwards;
    place-content: center;
    div {
        font-size: clamp(2.5rem, calc((10vw + 6vh) / 2), calc((10vw + 6vh) / 2));
        color: #fff;
        animation: splash-fade 1s ease 0.7s forwards;
        font-family: "Oswald", sans-serif;;
    }
}

@keyframes splash-fade {
    to { opacity: 0; visibility: hidden; }
}
</style>

<div id="splash-screen">
    <div class="splash-screen-inner"><% if $IsHomePage %>$SiteConfig.Title<% else %>$Title<% end_if %></div>
</div>
<header id="print" style="display: none;">
    <img src="_resources/themes/sun/dist/images/logo-small.svg" alt="Sunny Side Up Logo" />
    <div><% if $IsHomePage %>$SiteConfig.Title<% else %>$SiteConfig.Title - $Title<% end_if %></div>
</header>
<header id="header">
    <a href="/#no-menu" id="logo"></a>
    <div class="logo-header">
        <h1><a href="#top" class="page-title"><% if $IsHomePage %>$SiteConfig.Title<% else %>$Title<% end_if %></a></h1>
        <% if $Parent %><a href="$Parent.Link" class="bread-crumb"><span class="up-baby-up">↴</span> $Parent.Title</a><% else %>
        <% if $IsHomePage %><% else %><a href="/#no-menu" class="bread-crumb"><span class="up-baby-up">↴</span> Sunny Side Up</a><% end_if %><% end_if %>
    </div>
</header>
