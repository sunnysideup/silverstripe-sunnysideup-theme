<%-- Wonky line divider sprite.
     12 unique hand-drawn divider lines as <symbol> elements.
     Each .element block picks one via :nth-child rotation in SCSS
     (wonky-line-mask), so adjacent blocks never share the same line.
     Kept in the DOM so the symbols are also available for <use>. --%>
<svg style="width: 0; height: 0; position: absolute; visibility: hidden;" aria-hidden="true">
	<defs>
		<symbol id="wonky-line-01" viewBox="0 0 960 14">
			<path d="M0 7 Q120 3 240 7 Q360 11 480 7 Q600 3 720 7 Q840 11 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-02" viewBox="0 0 960 14">
			<path d="M0 7 Q120 2.5 240 7 Q360 11.5 480 7 Q600 2.5 720 7 Q840 11.5 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-03" viewBox="0 0 960 14">
			<path d="M0 7 Q96 4 192 7 Q288 11.5 384 7 Q480 3 576 7 Q672 10 768 7 Q864 5 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-04" viewBox="0 0 960 14">
			<path d="M0 7 Q160 5 320 7 Q480 11.5 640 7 Q800 3 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-05" viewBox="0 0 960 14">
			<path d="M0 7 Q80 5 160 7 Q240 10 320 7 Q400 4 480 7 Q560 9 640 7 Q720 4 800 7 Q880 10 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-06" viewBox="0 0 960 14">
			<path d="M0 7 Q240 2.5 480 7 Q720 11.5 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-07" viewBox="0 0 960 14">
			<path d="M0 7 Q120 11 240 7 Q360 11 480 7 Q600 5 720 7 Q840 5 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-08" viewBox="0 0 960 14">
			<path d="M0 7 Q96 5 192 7 Q288 11.5 384 7 Q480 3 576 7 Q672 11.5 768 7 Q864 4 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-09" viewBox="0 0 960 14">
			<path d="M0 7 Q120 6 240 7 Q360 6 480 7 Q600 11.5 720 7 Q840 6 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-10" viewBox="0 0 960 14">
			<path d="M0 7 Q80 3 160 7 Q240 11 320 7 Q400 3 480 7 Q560 11 640 7 Q720 3 800 7 Q880 11 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-11" viewBox="0 0 960 14">
			<path d="M0 7 Q160 2.5 320 7 Q480 6 640 7 Q800 11.5 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
		<symbol id="wonky-line-12" viewBox="0 0 960 14">
			<path d="M0 7 Q120 6 240 7 Q360 6 480 7 Q600 11.5 720 7 Q840 6 960 7" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none" />
		</symbol>
	</defs>
</svg>
