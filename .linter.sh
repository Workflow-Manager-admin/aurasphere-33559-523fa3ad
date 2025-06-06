#!/bin/bash
cd /home/kavia/workspace/code-generation/aurasphere-33559-523fa3ad/aura_sphere
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

