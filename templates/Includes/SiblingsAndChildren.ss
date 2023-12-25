<% if $MenuChildren || $Siblings || $PhotoCredit %>
<div id="SiblingsAndChildren" class="dnadesign__elemental__models__elementcontent">
<% if $MenuChildren %>
    <h2>Delve Deeper</h2>
    <% if MenuChildren.count = 1 %>
        <p>
            Please also visit our <% loop MenuChildren %><a href="$Link">$Title</a><% end_loop %> page.
        </p>
    <% else %>
        <p>Pages in the <a href="#top">$MenuTitle</a> section of our site:</p>
        <ul>
            <% loop MenuChildren %><li class="$FirstLast $LinkingMode"><a href="$Link">$MenuTitle</a></li><% end_loop %>
        </ul>
    <% end_if %>
<% end_if %>

<% if $Siblings %>
    <h2>Also See</h2>
    <% if Siblings.count = 1 %>
        <p>
            Please also visit our <% loop Siblings %><a href="$Link">$Title</a><% end_loop %> page in the
            <a href="$Parent.Link">$Parent.MenuTitle</a> section.
        </p>
    <% else %>
        <p>Other pages in the <a href="$Parent.Link">$Parent.MenuTitle</a> section:</p>
        <ul>
            <% loop Siblings %><li class="$FirstLast $LinkingMode"><a href="$Link">$MenuTitle</a></li><% end_loop %>
        </ul>
    <% end_if %>
<% end_if %>

    <% if $PhotoCredit %>
    <h3>Intro Photo Credit</h3>
    <p>$PhotoCredit. All rights reserved.
    </p>
    <% end_if %>

</div>
<% end_if %>
