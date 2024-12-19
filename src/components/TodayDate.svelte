<script>
    import { capitalizeFirstLetter } from '@App/functions/format.js';
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    export let style = '';
    const today = new Date();
    const formatDate = new Intl.DateTimeFormat('es-ES', options);
    const formattedDate = formatDate.format(today);
</script>

<span class={style}>{capitalizeFirstLetter(formattedDate)}</span>
