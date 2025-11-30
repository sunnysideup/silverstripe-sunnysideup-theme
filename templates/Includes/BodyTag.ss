<body
    class="
        theme-rocket title-colour-$TitleColour
        <% if $NoRocketShow %>no-rocket-show<% else %>has-rocket-show<% end_if %>
        <% if $HasQuote %>has-quote<% else %>no-quote<% end_if %>
        <% if $HasVideo %>has-video<% else %>no-video<% end_if %>
    "
    id="top"
    <% if $RandomImage %>data-bg-image="$RandomImage"<% end_if %>
    <% if $RandomImageX %>data-bg-image-x="$RandomImageX.Nice"<% end_if %>
    <% if $RandomImageY %>data-bg-image-y="$RandomImageY.Nice"<% end_if %>
    <% if $VimeoVideoID %>data-video-id="$VimeoVideoID"<% end_if %>
    data-shadow-over-logo="$ShadowOverLogo"
    data-theme="<% if $DefaultTheme %>theme-$DefaultTheme<% end_if %>"
>
