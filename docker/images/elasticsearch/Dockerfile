FROM docker.elastic.co/elasticsearch/elasticsearch:8.19.0

WORKDIR /usr/share/elasticsearch

USER root
RUN microdnf install -y unzip || true && microdnf clean all || true
USER elasticsearch

COPY analysis-icu-8.19.0.zip       /tmp/
COPY analysis-kuromoji-8.19.0.zip  /tmp/
COPY analysis-smartcn-8.19.0.zip   /tmp/
COPY analysis-stempel-8.19.0.zip   /tmp/

RUN bash -lc '\
  set -euo pipefail; \
  install_zip() { \
    local zip="$1"; local name="$2"; \
    echo "==> Validando /tmp/$zip"; unzip -t "/tmp/$zip" >/dev/null; \
    echo "==> Tentando instalar via elasticsearch-plugin: $name"; \
    if bin/elasticsearch-plugin install --batch "file:///tmp/$zip"; then \
      echo "==> OK: $name (installer)"; \
    else \
      echo "==> Installer falhou para $name; tentando fallback (unzip em plugins/$name)"; \
      mkdir -p "plugins/$name"; \
      unzip -q "/tmp/$zip" -d "plugins/$name"; \
      test -f "plugins/$name/plugin-descriptor.properties" || \
        { echo "ERRO: plugin-descriptor.properties não encontrado em plugins/$name"; exit 1; }; \
      echo "==> OK: $name (fallback unzip)"; \
    fi; \
  }; \
  install_zip analysis-icu-8.19.0.zip      analysis-icu; \
  install_zip analysis-kuromoji-8.19.0.zip analysis-kuromoji; \
  install_zip analysis-smartcn-8.19.0.zip  analysis-smartcn; \
  install_zip analysis-stempel-8.19.0.zip  analysis-stempel;'

EXPOSE 9200 9300

COPY init-es-security.sh /usr/local/bin/init-es-security.sh
USER root
RUN chmod +x /usr/local/bin/init-es-security.sh
USER elasticsearch

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

CMD ["/usr/local/bin/init-es-security.sh"]