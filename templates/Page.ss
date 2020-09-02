<!DOCTYPE html>
<% if $HasCacheKeyContent %><% cached $CacheKeyContent %>
<!-- cached -->
<html lang="$ContentLocale">
<head>
    $ExtendedMetaTags
    <% require themedCss('dist/main') %>
</head>

<body class="theme-sun" id="top" data-bg-image="/resources$RandomImage">
    <% include Header %>
    <% include Nav %>

    <main id="main">
        <div class="typography">
            $Layout
        </div>
    </main>

    <% include Footer %>
    <% require themedJavascript('dist/main') %>

<% end_cached %><% else %>

<!-- uncached -->

<html lang="$ContentLocale">
<head>
    $ExtendedMetaTags
    <% require themedCss('dist/main') %>
</head>

<body class="theme-sun" id="top" data-bg-image="/resources$RandomImage">
    <% include Header %>
    <% include Nav %>

    <main id="main">
        <div class="typography">
            $Layout
        </div>
    </main>

    <% include Footer %>
    <% require themedJavascript('dist/main') %>
<% end_if %>
</body>
</html>
