<% if $Pages %>

<span id="Breadcrumbs">
    <a href="/" class="first site-title">$SiteConfig.Title</a>
<% loop $Pages %>
    <% if $Link = / %>
    <% else %>
        <span class="arrow">/</span>
        <% if $Last %>
        <% else %>
            <a href="$Link" class="breadcrumb-$Pos">$MenuTitle</a>
        <% end_if %>
    <% end_if %>
<% end_loop %>
</span>

<% end_if %>
