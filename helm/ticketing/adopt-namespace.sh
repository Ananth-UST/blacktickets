#!/bin/bash
# Usage: ./adopt-namespace.sh <namespace> <release-name>
NAMESPACE=$1
RELEASE=$2

echo "Adopting namespace: $NAMESPACE for release: $RELEASE"

# Adopt namespace
kubectl label namespace $NAMESPACE \
  app.kubernetes.io/managed-by=Helm --overwrite
kubectl annotate namespace $NAMESPACE \
  meta.helm.sh/release-name=$RELEASE \
  meta.helm.sh/release-namespace=$NAMESPACE \
  --overwrite

# Adopt all resources
for resource in pvc configmap secret deployment service; do
  kubectl get $resource -n $NAMESPACE --no-headers \
    -o custom-columns=":metadata.name" 2>/dev/null | \
  while read name; do
    echo "  Adopting $resource/$name"
    kubectl label $resource $name -n $NAMESPACE \
      app.kubernetes.io/managed-by=Helm --overwrite 2>/dev/null
    kubectl annotate $resource $name -n $NAMESPACE \
      meta.helm.sh/release-name=$RELEASE \
      meta.helm.sh/release-namespace=$NAMESPACE \
      --overwrite 2>/dev/null
  done
done

echo "Done!"
