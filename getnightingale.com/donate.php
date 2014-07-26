<!DOCTYPE html>
<html>
    <head>
        <!-- meta info -->
        <meta charset="utf-8">
        <title data-l10n-id="donate_title">Donate to Nightingale</title>
        <?php include "../static.getnightingale.com/php/head.php"; ?>
    </head>
    <body>
        <div id="ngalemainheadwrapper" class="wrapper">
            <?php include "../static.getnightingale.com/php/header.php"; ?>
        </div>
        <div class="wrapper" id="wrapper">
            <main id="main" class="container">
                <h1 data-l10n-title="donate_title">Donate to Nightingale</h1>
                <p data-l10n-title="donate_description">We do currently not accept direct donations. Instead consider <a href="https://www.bountysource.com/trackers/230233-nightingale-media-player-nightingale-hacking">putting money on a bug as bounty</a> or <a href="https://www.bountysource.com/teams/nightingale">add it to the projects Bountysource funds</a> where we can then decide on which but to put the bounty.</p>
            </main>
        </div>
        <div class="wrapper" id="ngalemainfooterwrapper">
            <?php include "../static.getnightingale.com/php/footer.php"; ?>
        </div>
        <!-- Piwik -->
        <script type="application/javascript">
          var _paq = _paq || [];
          _paq.push(["trackPageView"]);
          _paq.push(["enableLinkTracking"]);

          (function() {
            var u=(("https:" == document.location.protocol) ? "https" : "http") + "://stats.getnightingale.com/";
            _paq.push(["setTrackerUrl", u+"piwik.php"]);
            _paq.push(["setSiteId", "2"]);
            var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="application/javascript";
            g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
          })();
        </script>
        <!-- End Piwik Code -->
    </body>
</html>