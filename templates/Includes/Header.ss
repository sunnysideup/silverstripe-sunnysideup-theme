<header id="print" style="display: none;">
    <img src="resources/themes/sun/dist/images/logo-small.svg" alt="Sunny Side Up Logo" />
    <h1><% if $IsHomePage %>$SiteConfig.Title<% else %>$SiteConfig.Title - $Title<% end_if %></h1>
</header>
<header id="header">
    <a href="/" id="logo"></a>
    <h1>
        <a href="#top" class="page-title"><% if $IsHomePage %>$SiteConfig.Title<% else %>$Title<% end_if %></a>
        <% if $Parent %><a href="$Parent.Link" class="bread-crumb">↳ $Parent.Title</a><% else %>
        <% if $IsHomePage %><% else %><a href="/" class="bread-crumb">↳ Sunny Side Up</a><% end_if %><% end_if %>
    </h1>
</header>
