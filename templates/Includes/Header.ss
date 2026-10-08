<style>
#splash-screen {
    position: fixed;
    inset: 0;
    z-index: 999;
    display: grid;
    place-items: center;
    place-content: center;
    background: #f7cd55;
    animation: splash-fade 1s ease 1.5s forwards;

    .splash-screen-inner {
        font-size: clamp(2.5rem, calc((10vw + 6vh) / 2), calc((10vw + 6vh) / 2));
        animation: splash-fade 1s ease 0.7s forwards;
        font-family: "Oswald", sans-serif;
    }

    .splash-word {
        color: #fff;
        position: relative;
        display: inline-block;
    }

    .splash-underline {
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        height: clamp(4px, 0.12em, 7px);
        overflow: visible;
        pointer-events: none;

        path {
            fill: none;
            stroke: #fff;
            stroke-width: 7px;
            stroke-linecap: round;
            vector-effect: non-scaling-stroke;
        }
    }
}
body:not(.title-colour-blue) #splash-screen  {
    background-color: #022866;
}

@keyframes splash-fade {
    to { opacity: 0; visibility: hidden; }
}
</style>

<div id="splash-screen">
    <div class="splash-screen-inner">
        <span class="splash-word"><% if $IsHomePage %>$SiteConfig.Title<% else %>$Title<% end_if %><svg class="splash-underline" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 10 Q50 0 100 10" /></svg></span>
    </div>
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
