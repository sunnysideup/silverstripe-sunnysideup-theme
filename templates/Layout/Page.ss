


<blockquote class="main-quote">
    <p id="my-quote" class="<% if $TypeModeForQuote %>has-typing-mode<% else %>no-typing-mode<% end_if %>">
        <% if $Quote %>
            $Quote
            <a href="#content-below-quote" class="blinker smaller">↯</a>
        <% else %>
            <% if $IsHomePage %>
                Kia Ora —<br />
                We are here to make you <a href="#content-below-quote" class="blinker italic">shine</a> online.
            <% end_if %>
        <% end_if %>
    </p>
</blockquote>

<div  id="content-below-quote">
    $Content
    $ElementalArea
    $Form

    <% include SiblingsAndChildren %>

    <% if $LastEdited %>
        <p class="last-updated">
        {
            This page was last updated {$LastEdited.Ago}.
            <% if $SiteConfig.CopyrightNotice %>&copy; {$SiteConfig.CopyrightNotice}<% end_if %>
            <% if $IntroVideoCredit %>&copy; Video: {$IntroVideoCredit}<% end_if %>
            <% if $IntroPhotoCredit %>&copy; Photo: {$IntroPhotoCredit}<% end_if %>
        }
        </p>
    <% end_if %>
</div>
