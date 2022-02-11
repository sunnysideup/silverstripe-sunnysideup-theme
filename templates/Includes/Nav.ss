<div id="nav">
    <div id="menu-toggle" data-add-class="menu-on" data-toggle="true">
        <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M37 -3.23464e-06C16.5655 -5.02109e-06 5.02109e-06 16.5655 3.23464e-06 37C1.4482e-06 57.4345 16.5655 74 37 74C57.4345 74 74 57.4345 74 37C74 16.5655 57.4345 -1.4482e-06 37 -3.23464e-06ZM39.0586 45.9492C39.6035 46.5547 39.6641 47.4629 39.0586 48.0684L37.7266 49.4004C37.1211 49.9453 36.2129 49.9453 35.668 49.4004L23.8613 37.6543C23.3164 37.0488 23.3164 36.1406 23.8613 35.5957L35.668 23.7891C36.2129 23.2441 37.1211 23.2441 37.7266 23.7891L39.0586 25.1211C39.6035 25.7266 39.6035 26.6348 39.0586 27.2402L31.7324 34.2031L49.1094 34.2031C49.957 34.2031 50.5625 34.8086 50.5625 35.6562L50.5625 37.5937C50.5625 38.3809 49.957 39.0469 49.1094 39.0469L31.7324 39.0469L39.0586 45.9492Z" fill="white"/>
        </svg>

        <svg width="23.34" height="22.938" version="1.1" viewBox="0 0 23.34 22.938" xmlns="http://www.w3.org/2000/svg" id="open-icon">
            <defs>
                <style>.cls-1{fill:#8ca6f9;}.cls-2{fill:#2d57ff;}</style>
            </defs>
            <g transform="translate(-11 -11.209)" data-name="Layer 2">
                <rect class="cls-1" transform="rotate(-.42 23.096 26.004)" x="18.82" y="17.82" width="7.8" height="16.3" rx=".57" fill="#8ca6f9"/>
                <path class="cls-1" d="m34.34 20.12c0 7.47-5.2 3.82-11.64 3.87s-11.62 4.25-11.7-3.7c0-5 5.15-9 11.59-9.08s11.71 3.94 11.75 8.91z" fill="#8ca6f9"/>
                <path class="cls-2" d="m26.61 24.27c-0.36-0.83-0.82-5.45 1.15-5.4s3.6 1.44 3.68 2.67-1.61 2-2.13 2-0.82-1-1.45-1.1-1 2.42-1.25 1.83z" fill="#2d57ff"/>
                <path class="cls-2" d="m18.88 24.39c0.34-0.83 0.73-5.45-1.24-5.38s-3.57 1.49-3.64 2.72 1.64 2 2.16 2 0.8-1 1.43-1.12 1.04 2.39 1.29 1.78z" fill="#2d57ff"/>
            </g>
        </svg>
    </div>
    <div id="nav-inner">
        <nav class="nav-item">
            <ul class="collapsibleList">
                <% loop Menu(1) %>
                    <li class="$FirstLast $LinkingMode level1  rotate-360-horizontal-fwd">
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
