<html lang="$ContentLocale">
<head>
    $ExtendedMetaTags
    <% include WebpackCSSLinks %>
</head>
<body
    class="
        theme-rocket title-colour-$TitleColour
        <% if $NoRocketShow %>no-rocket-show<% else %>has-rocket-show<% end_if %>
        <% if $HasQuote %>has-quote<% else %>no-quote<% end_if %>
        <% if $HasVideo %>has-video<% else %>no-video<% end_if %>
    "
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
