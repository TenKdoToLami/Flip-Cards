---
layout: default
title: Flip Cards
---


<div id="sidebar-container">
{% include sidebar.html %}
</div>


<div id="flipcard-container">
<!-- Flipcards will be rendered here -->
</div>

<div id="media-controls">

	<button id="first-page-btn">
		<svg viewBox="0 0 24 24" width="100%" height="100%">
			<path fill="currentColor" d="M18 6v12l-8-6zM6 6h2v12H6z" />
		</svg>
	</button>

  	<button id="prev-page-btn">
  		<svg viewBox="0 0 24 24" width="100%" height="100%">
  			<path fill="currentColor" d="M15 18l-6-6 6-6v12z" />
  		</svg>
  	</button>

  	<button id="auto-scroll-btn">
  		<svg viewBox="0 0 24 24" width="100%" height="100%">
  			<path fill="currentColor" d="M8 5v14l11-7z" />
  		</svg>
  	</button>

  	<button id="next-page-btn">
  		<svg viewBox="0 0 24 24" width="100%" height="100%">
  			<path fill="currentColor" d="M9 6l6 6-6 6V6z" />
  		</svg>
  	</button>

  	<button id="last-page-btn">
  		<svg viewBox="0 0 24 24" width="100%" height="100%">
  			<path fill="currentColor" d="M6 6v12l8-6-8-6zM18 6h-2v12h2z" />
  		</svg>
  	</button>

</div>

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
<script>
  const BASE_URL = "{{ '/' | relative_url }}";
  const ALL_FLIPCARDS = {{ site.data | jsonify }};
</script>
