<% if $MenuChildren || $Siblings || $PhotoCredit %>
<% if $MenuChildren %>
<div class="element dnadesign__elemental__models__elementcontent siblings-and-children">
<div class="content-element__content">
    <h2 class="content-element__title">Delve Deeper</h2>
    <% if MenuChildren.count = 1 %>
        <p>
            Please also visit our <% loop MenuChildren %><a href="$Link">$Title</a><% end_loop %> page.
        </p>
    <% else %>
        <p>In the <a href="#top">$MenuTitle</a> section of our site you can find out more about:</p>
        <ul>
            <% loop MenuChildren %><li class="$FirstLast $LinkingMode"><a href="$Link">$MenuTitle</a></li><% end_loop %>
        </ul>
    <% end_if %>
</div>
</div>
<% end_if %>

<% if $Siblings %>
<div class="element dnadesign__elemental__models__elementcontent siblings-and-children">
<div class="content-element__content">
    <h2 class="content-element__title">Also See</h2>
    <% if Siblings.count = 1 %>
        <p>
            Please also visit our <% loop Siblings %><a href="$Link">$Title</a><% end_loop %> page in the
            <a href="$Parent.Link">$Parent.MenuTitle</a> section.
        </p>
    <% else %>
        <p>Other topics in the <a href="$Parent.Link">$Parent.MenuTitle</a> section:</p>
        <ul>
            <% loop Siblings %><li class="$FirstLast $LinkingMode"><a href="$Link">$MenuTitle</a></li><% end_loop %>
        </ul>
    <% end_if %>
</div>
</div>
<% end_if %>

<% if $PhotoCredit %>
<div class="element dnadesign__elemental__models__elementcontent siblings-and-children">
<div class="content-element__content">
        <h2 class="content-element__title">Intro Photo Credit</h2>
        <p>$PhotoCredit. All rights reserved.</p>
</div>
</div>
<% end_if %>

<% end_if %>
