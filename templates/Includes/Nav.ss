<div id="nav">
    <div id="menu-toggle" data-add-class="menu-on" data-toggle-rather-than-add="true">
        <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-button">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M37 -3.23464e-06C16.5655 -5.02109e-06 5.02109e-06 16.5655 3.23464e-06 37C1.4482e-06 57.4345 16.5655 74 37 74C57.4345 74 74 57.4345 74 37C74 16.5655 57.4345 -1.4482e-06 37 -3.23464e-06ZM39.0586 45.9492C39.6035 46.5547 39.6641 47.4629 39.0586 48.0684L37.7266 49.4004C37.1211 49.9453 36.2129 49.9453 35.668 49.4004L23.8613 37.6543C23.3164 37.0488 23.3164 36.1406 23.8613 35.5957L35.668 23.7891C36.2129 23.2441 37.1211 23.2441 37.7266 23.7891L39.0586 25.1211C39.6035 25.7266 39.6035 26.6348 39.0586 27.2402L31.7324 34.2031L49.1094 34.2031C49.957 34.2031 50.5625 34.8086 50.5625 35.6562L50.5625 37.5937C50.5625 38.3809 49.957 39.0469 49.1094 39.0469L31.7324 39.0469L39.0586 45.9492Z" fill="white"/>
        </svg>
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
