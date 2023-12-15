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
<<<<<<< HEAD
    class="theme-rocket title-colour-$TitleColour <% if $NoRocketShow %>no-rocket-show<% end_if %>"
=======
    class="theme-rocket title-colour-$TitleColour <% if $RocketShow %><% else %>no-rocket-show<% end_if %>"
>>>>>>> b14c66f283bc502f1d49d377a9d0532b4ba61287
    id="top"
    <% if $RandomImage %>data-bg-image="$RandomImage"<% end_if %>
    <% if $VimeoVideoID %>data-video-id="$VimeoVideoID"<% end_if %>
    data-shadow-over-logo="$ShadowOverLogo"
    data-theme="<% if $DefaultTheme %>theme-$DefaultTheme<% end_if %>"
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
    class="theme-rocket title-colour-$TitleColour <% if $RocketShow %><% else %>no-rocket-show<% end_if %>"
    id="top"
    <% if $RandomImage %>data-bg-image="$RandomImage"<% end_if %>
    <% if $VimeoVideoID %>data-video-id="$VimeoVideoID"<% end_if %>
    data-shadow-over-logo="$ShadowOverLogo"
    data-theme="<% if $DefaultTheme %>theme-$DefaultTheme<% end_if %>"
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
