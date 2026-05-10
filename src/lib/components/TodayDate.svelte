<script>
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const today = new Date();
    const formatDate = new Intl.DateTimeFormat('es-ES', options);
    const formattedDate = formatDate.format(today);
</script>

<span class="capitalize text-white/70 font-shadows">{formattedDate}</span>
