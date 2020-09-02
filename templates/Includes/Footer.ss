<footer id="footer">
    <div class="row">
        <div class="col">
            <address>
                <strong>Sunny Side Up Ltd.</strong><br />
                32 Salamanca Road<br />
                kelburn<br />
                Wellington 6012<br />
                Aotearoa New Zealand
            </address>

        </div>

        <div class="col">
            <p>
                <a href="$SiteConfig.PhoneNumber.TellLink">$SiteConfig.PhoneNumber</a>
            </p>
            <p>
                <a href="mailto:$SiteConfig.Email.HiddenEmailAddress">$SiteConfig.Email.HiddenEmailAddress</a>
            </p>
        </div>

        <div class="col">
            <% if $Menu(1) %>
                <ul>
                    <% loop Menu(1) %><li class="$FirstLast $LinkingMode"><a href="$Link">$MenuTitle</a></li><% end_loop %>
                </ul>
            <% end_if %>
            <% if SearchForm %>
            <div class="sidebarBox" id="SidebarSearch">
                <h3>For Searchers</h3>
                <div class="searchFormOuter">$SearchForm</div>
            </div>
            <% end_if %>
        </div>
        <div class="col" >
            <% include FooterThemeSelector %>
            <p>
                $SiteConfig.CopyrightNotice<br />
                Paged last updated {$LastEdited.Ago}.
            </p>
            <% if $SiteConfig.ClimatePositivePage %>
            <a href="$SiteConfig.ClimatePositivePage.Link" class="image-holder" id="ClimatePositive"><img src="resources/themes/sun_dist/images/climate-positive.png" alt="Climate Positive!" /></a>
            <% end_if %>

        </div>
    </div>
</footer>
