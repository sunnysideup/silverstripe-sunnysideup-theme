<!DOCTYPE html>

<% if $HasCacheKeyContent %>
<% cached $CacheKeyContent %>

<!-- IS cached -->
<% include HeadTag %>
<% include BodyTag %>
<% include Header %>
<% include Nav %>
<main id="main">
    <div class="typography">
        $Layout
    </div>
</main>
<% include Footer %>
<% include WebpackJSLinks %>

<% end_cached %>
<% else %>

<!-- NOT cached -->
<% include HeadTag %>
<% include BodyTag %>
<% include Header %>
<% include Nav %>
<main id="main">
    <div class="typography">
        $Layout
    </div>
</main>
<% include Footer %>
<% include WebpackJSLinks %>

<% end_if %>
</body>
</html>
