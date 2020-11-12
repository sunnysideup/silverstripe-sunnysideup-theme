<header id="print" style="display: none;">
    <img src="resources/themes/sun/dist/images/logo-small.svg" alt="Sunny Side Up Logo" />
    <h1><% if $IsHomePage %>$SiteConfig.Title<% else %>$SiteConfig.Title - $Title<% end_if %></h1>
</header>
<header id="header">
    <a href="/" id="logo"></a>
    <h1>
        <% if $IsHomePage %><% else %>$Breadcrumbs<% end_if %>
        <a href="#top" class="page-title"><% if $IsHomePage %>$SiteConfig.Title<% else %>$Title<% end_if %></a>
    </h1>
</header>
