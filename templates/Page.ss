<!DOCTYPE html>
<% if $HasCacheKeyContent %><% cached $CacheKeyContent %>
<!-- cached -->
<html lang="$ContentLocale">
<head>
    $ExtendedMetaTags
    <%-- <% require themedCss('dist/main') %> --%>
    <% include WebpackCSSLinks %>
</head>

<body class="theme-sun" id="top" data-bg-image="$RandomImage">
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

<body class="theme-sun" id="top" data-bg-image="$RandomImage">
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

<% if $TypeModeForQuote %>
<script src="https://unpkg.com/typewriter-effect@latest/dist/core.js"></script>
<script>
const string = document.getElementById('my-quote').innerHTML
new Typewriter(
  '#my-quote',
  {
    strings: [string],
    autoStart: true,
    pauseFor: 30 * 1000,
    cursor: '',
    loop: true,
  }
)
</script>
<% end_if %>

</body>
</html>
