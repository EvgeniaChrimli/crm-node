FROM postgres:16.9-bookworm

# Генерируем русскую локаль — нужна для корректной сортировки кириллицы
# (ORDER BY по русским текстовым полям, COLLATE "ru_RU.UTF-8")
RUN localedef \
        -i ru_RU -c -f UTF-8 \
        -A /usr/share/locale/locale.alias \
        ru_RU.UTF-8