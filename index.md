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

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
<script>
  const ALL_FLIPCARDS = {{ site.data | jsonify }};
</script>
<script src="/assets/js/flipcards.js"></script>
