<header id="print" style="display: none;">
    <img src="_resources/themes/sun/dist/images/logo-small.svg" alt="Sunny Side Up Logo" />
    <h1><% if $IsHomePage %>$SiteConfig.Title<% else %>$SiteConfig.Title - $Title<% end_if %></h1>
</header>
<header id="header">
    <a href="/#no-menu" id="logo"></a>
    <h1>
        <a href="#top" class="page-title"><% if $IsHomePage %>$SiteConfig.Title<% else %>$Title<% end_if %></a>
        <% if $Parent %><a href="$Parent.Link" class="bread-crumb"><span class="up-baby-up">↴</span> $Parent.Title</a><% else %>
        <% if $IsHomePage %><% else %><a href="/#no-menu" class="bread-crumb"><span class="up-baby-up">↴</span> Sunny Side Up</a><% end_if %><% end_if %>
    </h1>
</header>
