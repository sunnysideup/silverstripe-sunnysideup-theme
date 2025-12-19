<div id="nav">
    <div id="menu-toggle" data-add-class="menu-on" data-toggle-rather-than-add="true">
    <% include Arrow %>
    </div>
    <div id="nav-inner">
        <nav class="nav-item">
            <ul class="collapsibleList">
                <% loop Menu(1) %>
                    <li class="$FirstLast $LinkingMode level1 countable-icons icon-$Pos collapsibleListNotOpen">
                        <span class="icon">&nbsp;</span>
                        <a class="$LinkingMode level1" href="$Link<% if $IsHomePage %>home/#no-menu<% end_if %>">$MenuTitle</a>
                        <% if Children %>
                        <ul>
                        <% loop Children %><% if ShowInMenus %>
                            <li class="$FirstLast $LinkingMode level1">
                            <a href="$Link">$MenuTitle</a>
                                <% if Children %>
                                <ul>
                                <% loop Children %><% if ShowInMenus %>
                                    <li class="$FirstLast $LinkingMode level3">
                                        <a href="$Link">$MenuTitle</a>
                                    </li>
                                <% end_if %><% end_loop %>
                                </ul>
                                <% end_if %>
                            </li>
                        <% end_if %><% end_loop %>
                        </ul>
                    <% end_if %>
                    </li>
                <% end_loop %>
            </ul>
        </nav>

    </div>
</div>
