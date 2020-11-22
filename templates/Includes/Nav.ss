<div id="nav">
    <a href="#nav" id="menu-toggle" data-add-class="menu-on" data-toggle="true">
        <svg width="21" height="31" version="1.1" viewBox="0 0 21 31" xmlns="http://www.w3.org/2000/svg" id="closed-icon">
            <defs>
                <style>.cls-1{fill:#8ca6f9;}.cls-2{fill:#2d57ff;}</style>
            </defs>
            <g transform="translate(-12.448 -7.1391)" data-name="Layer 2">
                <path class="cls-1" d="m24 7.24a7.37 7.37 0 0 0-4.63 1.54 6.53 6.53 0 0 0-1.68 2.55c-2.43 5.63-3 4.8-4 8.12-0.79 2.49-1.68 5.3-1 8.86a12.53 12.53 0 0 0 3.49 6.84 9.92 9.92 0 0 0 4.76 2.75 9.78 9.78 0 0 0 6.73-0.9c3.77-2.1 4.7-6.19 5-7.67 0.47-2.07 0.23-4-0.25-7.79a44.21 44.21 0 0 0-1.66-7.54 15.06 15.06 0 0 0-2.69-5.24 4.44 4.44 0 0 0-1.48-1.14 5.15 5.15 0 0 0-2.59-0.38z" fill="#8ca6f9"/>
                <path class="cls-2" d="m22.86 19.71c-3.28-0.23-5.29 3.06-5.64 5.94a5 5 0 0 0 4.72 5.79 5.59 5.59 0 0 0 4.21-1.31 5.35 5.35 0 0 0 1.46-4.08c-0.08-2.52-1.75-6.12-4.75-6.34z" fill="#2d57ff"/>
            </g>
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
    </a>
    <div id="nav-inner">
        <nav class="nav-item">
            <ul class="collapsibleList rotate-360-horizontal-fwd">
                <% loop Menu(1) %>
                    <li class="$FirstLast $LinkingMode level1">
                        <a class="$LinkingMode level1" href="$Link">$MenuTitle</a>
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
