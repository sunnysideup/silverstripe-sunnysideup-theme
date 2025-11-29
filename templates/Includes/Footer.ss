<footer id="footer" class="fade-on-no-rocket">
    <div class="row">
        <div class="col">
            <address>
                <strong>Sunny Side Up Ltd.</strong><br />
                32 Salamanca Road<br />
                Kelburn<br />
                Wellington 6012<br />
                Aotearoa New Zealand
            </address>

        </div>

        <div class="col">
            <p>
                <a href="$SiteConfig.PhoneNumber.TelLink">$SiteConfig.PhoneNumber</a>
            </p>
            <p>
                <a href="mailto:$SiteConfig.Email.HiddenEmailAddress">$SiteConfig.Email.HiddenEmailAddress</a>
            </p>
        </div>

        <div class="col">
            <% if $Menu(1) %>
                <ul>
                <% loop Menu(1) %><li class="$FirstLast $LinkingMode"><a href="$Link#no-menu">$MenuTitle</a></li><% end_loop %>
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
            <% if $SiteConfig.ClimatePositivePage %>
            <a href="$SiteConfig.ClimatePositivePage.Link" class="image-holder" id="ClimatePositive"><img src="$resourceURL(/themes/sun/dist/images/climate-positive.png)" alt="Climate Positive!" /></a>
            <% end_if %>
            <% if $SiteConfig.ShopifyPartnerPage %>
            <a href="$SiteConfig.ShopifyPartnerPage.Link" class="image-holder" id="ShopifyPartner">
                <picture>
                    <source srcset="$resourceURL(/themes/sun/dist/images/shopify-partner.webp)" type="image/webp">
                    <img src="$resourceURL(/themes/sun/dist/images/shopify-partners.png)" alt="shopify partners" />
                </picture>
            </a>
            <% end_if %>

        </div>
    </div>
</footer>
<div id="battery-saver-div">
    <svg class="svg-icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M792 288H128c-52.8 0-96 43.2-96 96v256c0 52.8 43.2 96 96 96h664c52.8 0 96-43.2 96-96V384c0-52.8-43.2-96-96-96z m40 352c0 22-18 40-40 40H128c-22 0-40-18-40-40V384c0-22 18-40 40-40h664c22 0 40 18 40 40v256z m96-230.8v205.6c32 0 64-55.4 64-102.8s-32-102.8-64-102.8z"  /><path d="M768 384H152c-13.2 0-24 10.8-24 24v208c0 13.2 10.8 24 24 24h616c13.2 0 24-10.8 24-24V408c0-13.2-10.8-24-24-24z"  /></svg>
    <p>
        This website has gone into battery saving mode. This is a small part of our effort to reduce climate impact. Click to return to website.
    </p>
</div>
