<!DOCTYPE html>
<% if $HasCacheKeyContent %><% cached $CacheKeyContent %>
<!-- cached -->
<html lang="$ContentLocale">
<head>
    $ExtendedMetaTags
    <%-- <% require themedCss('dist/main') %> --%>
    <% include WebpackCSSLinks %>
</head>

<body
    class="theme-<% if $DefaultTheme %>$DefaultTheme<% else %>sun<% end_if %> title-colour-$TitleColour"
    id="top"
    data-bg-image="$RandomImage"
    data-shadow-over-logo="$ShadowOverLogo"
>
    <% include Header %>
    <% include Nav %>

    <main id="main">
        <div class="typography">
            $Layout
        </div>
    </main>

    <% include Footer %>
    <% include WebpackJSLinks %>

<% end_cached %><% else %>

<!-- uncached -->

<html lang="$ContentLocale">
<head>
    $ExtendedMetaTags
    <% include WebpackCSSLinks %>
</head>

<body
    class="theme-<% if $DefaultTheme %>$DefaultTheme<% else %>sun<% end_if %> title-colour-$TitleColour"
    id="top"
    data-bg-image="$RandomImage"
    data-shadow-over-logo="$ShadowOverLogo"
>
    <% include Header %>
    <% include Nav %>
    <main id="main">
        <div class="typography">
            $Layout
        </div>
    </main>

    <% include Footer %>
    <% include WebpackJSLinks %>
    <%-- <% require themedJavascript('sun/dist/main') %> --%>
<% end_if %>


</body>
</html>
